import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import {
  ActionPayload,
  ErrorResponse,
  GetUserResponse,
  Message,
  MessageAction,
  MessageAttachment,
  SlashCommandPayload,
  SuccessResponse,
} from './models/slack.model';
import { MessageService } from '../message/message.service';
import { ConfigService } from '../shared/services/config.service';
import { AxiosError, AxiosResponse } from '@nestjs/common/http/interfaces/axios.interfaces';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class SlackService {

  private readonly fallbackText: string = 'Your channel does not support me';
  private readonly token: string;
  private readonly rantChannelId: string;
  private readonly ahChannelId: string;
  private readonly oauthURL: string;
  private readonly userInfoURL: string;
  private readonly chatCommandURL: string;
  private readonly yomamaURL: string;
  private readonly textForGIFsArray: string[] = ['you deserve it', 'that\'s what you get', 'comfort'];
  private clientId: string;
  private clientSecret: string;

  constructor(private readonly _http: HttpService,
              private readonly _messageService: MessageService,
              private readonly _configService: ConfigService) {
    this.token = process.env.SLACK_TOKEN || _configService.get('SLACK_TOKEN');
    this.rantChannelId = process.env.SLACK_RANT_CHANNEL || _configService.get('SLACK_RANT_CHANNEL');
    this.ahChannelId = process.env.SLACK_AH_CHANNEL || _configService.get('SLACK_AH_CHANNEL');
    this.oauthURL = process.env.SLACK_OAUTH_URL || _configService.get('SLACK_OAUTH_URL');
    this.userInfoURL = process.env.SLACK_USER_INFO_URL || _configService.get('SLACK_USER_INFO_URL');
    this.chatCommandURL = process.env.SLACK_CHAT_COMMAND_URL || _configService.get('SLACK_CHAT_COMMAND_URL');
    this.yomamaURL = process.env.YOMAMA_API || _configService.get('YOMAMA_API');
  }

  async handleRant(actionPayload: SlashCommandPayload): Promise<any> {
    const { text, channel_id, user_id } = actionPayload;
    let message: Message;
    let attachments: MessageAttachment[];
    if (!text || text.trim() === null) {
      const messageText: string = 'Bi*ch! What the hell are you ranting on?!';
      attachments = await this.createAttachments('danger', 'rant_invoker', 'ERROR!!');
      message = this.createMessage(channel_id, messageText, attachments);
    } else {
      attachments = await this.createAttachments('good', 'rant_invoker', 'New RANT incomingg!', text, true, user_id);
      message = this.createMessage(this.rantChannelId, null, attachments);
    }
    await this.sendBotMessage(message);
    return;
  }

  async handleJoke(actionPayload: SlashCommandPayload): Promise<any> {
    const { channel_id } = actionPayload;

    const response = await this._http.get<YomamaJoke>(this.yomamaURL).toPromise();
    const message = this.createMessage(channel_id, response.data.joke);

    await this.sendBotMessage(message);
    return;
  }

  async handleOAuth(code: string): Promise<any> {
    this.clientId = process.env.SLACK_CLIENT_ID || this._configService.get('SLACK_CLIENT_ID');
    this.clientSecret = process.env.SLACK_CLIENT_SECRET || this._configService.get('SLACK_CLIENT_SECRET');
    const slackOAuthURI: string = `${this.oauthURL}?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${code}`;
    this._http.get(slackOAuthURI, { headers: this.getHeaders(false) }).subscribe(() => {
      return true;
    });
  }

  async handleComfortAction(actionPayload: ActionPayload): Promise<any> {
    const text = this.getRandomInArray(this.textForGIFsArray);
    const channelId = actionPayload.channel.id;

    const result = await this.invokeGifCommand(channelId, text);
    console.log(result);
    return;
  }

  async handleInYourFaceAction(actionPayload: ActionPayload): Promise<any> {

  }

  private async sendBotMessage(message: Message): Promise<boolean> {
    const postMessageUrl: string = process.env.SLACK_POST_MESSAGE_URL || this._configService.get('SLACK_POST_MESSAGE_URL');
    return new Promise<boolean>((resolve => {
      this._http.post<SuccessResponse | ErrorResponse>(postMessageUrl, message, { headers: this.getHeaders() })
        .pipe(
          catchError((err: AxiosError) => {
            throw new HttpException({
              status: HttpStatus.I_AM_A_TEAPOT,
              err,
              message: err.message,
            }, HttpStatus.I_AM_A_TEAPOT);
          }),
        ).subscribe((value: AxiosResponse<SuccessResponse | ErrorResponse>) => {
        if (value.data instanceof ErrorResponse) {
          resolve(false);
        }

        resolve(true);
      });
    }));
  }

  private createMessage(channelId: string,
                        text?: string,
                        attachments?: MessageAttachment[],
                        replace_original: boolean = true): Message {

    return {
      token: this.token,
      text,
      channel: channelId,
      attachments,
      replace_original,
    };
  }

  private async createAttachments(color: string,
                                  callbackId: string,
                                  title: string,
                                  text?: string,
                                  isRant: boolean = false,
                                  userId?: string): Promise<MessageAttachment[]> {
    const userInfo = await this.getUserInfo(userId);
    const attachment: MessageAttachment = {
      callback_id: callbackId,
      fallback: this.fallbackText,
      title,
      text,
      footer: 'Super Time Efficient Service',
      ts: moment().unix(),
      color,
    };

    if (isRant && !userInfo.is_bot && !userInfo.is_app_user) {
      attachment.author_name = userInfo.profile.display_name_normalized;
      attachment.author_icon = userInfo.profile.image_24;
      attachment.fallback = `New rant from ${userInfo.profile.display_name_normalized}`;
      attachment.callback_id = `${callbackId}_button`;
    }

    return [attachment];
  }

  private createMessageButton(name: string, text: string, value: string, style: 'primary' | 'danger' | 'default' = 'primary'): MessageAction {
    return {
      name,
      text,
      value,
      type: 'button',
      style,
    };
  }

  private async getUserInfo(userId: string) {
    const getUserInfoURL = `${this.userInfoURL}?user=${userId}`;

    const response = await this._http.get<GetUserResponse>(getUserInfoURL, { headers: this.getHeaders() })
      .toPromise();

    if (!response.data || !response.data.ok) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    return response.data.user;
  }

  private invokeGifCommand(channelId: string, text: string): Promise<any> {
    const command = '/gif';
    const dataString = `token=${this.token}&channel=${channelId}&command=${command}&text=${text}`;
    return this._http.post(this.chatCommandURL, dataString, { headers: this.getHeaders() }).toPromise();
  }

  private getHeaders(json: boolean = true) {
    const headers = {};
    if (json) {
      headers['Content-Type'] = 'application/json';
    } else {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    headers['Authorization'] = `Bearer ${this.token}`;
    return headers;
  }

  private getRandomInArray(arr: any) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

export interface YomamaJoke {
  joke: string;
}
