import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';import {  ErrorResponse,  GetUserResponse,  Message,  MessageAction,  MessageAttachment,  SlashCommandPayload,  SuccessResponse,} from './models/slack.model';import { MessageService } from '../message/message.service';import { ConfigService } from '../shared/services/config.service';import { AxiosError, AxiosResponse } from '@nestjs/common/http/interfaces/axios.interfaces';import { catchError } from 'rxjs/operators';@Injectable()export class SlackService {  private readonly fallbackText: string = 'Your channel does not support me';  private readonly token: string;  private readonly rantChannelId: string;  private readonly ahChannelId: string;  private readonly oauthURL: string;  private readonly userInfoURL: string;  private clientId: string;  private clientSecret: string;  constructor(private readonly _http: HttpService,              private readonly _messageService: MessageService,              private readonly _configService: ConfigService) {    this.token = process.env.SLACK_TOKEN || _configService.get('SLACK_TOKEN');    this.rantChannelId = process.env.SLACK_RANT_CHANNEL || _configService.get('SLACK_RANT_CHANNEL');    this.ahChannelId = process.env.SLACK_AH_CHANNEL || _configService.get('SLACK_AH_CHANNEL');    this.oauthURL = process.env.SLACK_OAUTH_URL || _configService.get('SLACK_OAUTH_URL');    this.userInfoURL = process.env.SLACK_USER_INFO_URL || _configService.get('SLACK_USER_INFO_URL');  }  async handleRant(actionPayload: SlashCommandPayload): Promise<any> {    console.log('in handleRant service');    const { text, channel_id, user_id } = actionPayload;    let message: Message;    let attachments: MessageAttachment[];    if (!text || text.trim() === null) {      const messageText: string = 'Bi*ch! What the hell are you ranting on?!';      attachments = await this.createAttachments('danger', 'rant_invoker', 'ERROR!!');      message = this.createMessage(channel_id, messageText, attachments);    } else {      attachments = await this.createAttachments('good', 'rant_invoker', 'New RANT incomingg!', text, true, user_id);      message = this.createMessage(this.rantChannelId, null, attachments);    }    await this.sendBotMessage(message);    return;  }  async handleOAuth(code: string): Promise<any> {    this.clientId = process.env.SLACK_CLIENT_ID || this._configService.get('SLACK_CLIENT_ID');    this.clientSecret = process.env.SLACK_CLIENT_SECRET || this._configService.get('SLACK_CLIENT_SECRET');    const slackOAuthURI: string = `${this.oauthURL}?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${code}`;    this._http.get(slackOAuthURI, { headers: this.getHeaders(false) }).subscribe(() => {      return;    });  }  private async sendBotMessage(message: Message): Promise<boolean> {    const postMessageUrl: string = process.env.SLACK_POST_MESSAGE_URL || this._configService.get('SLACK_POST_MESSAGE_URL');    return new Promise<boolean>((resolve => {      this._http.post<SuccessResponse | ErrorResponse>(postMessageUrl, message, { headers: this.getHeaders() })        .pipe(          catchError((err: AxiosError) => {            throw new HttpException({              status: HttpStatus.I_AM_A_TEAPOT,              err,              message: err.message,            }, HttpStatus.I_AM_A_TEAPOT);          }),        ).subscribe((value: AxiosResponse<SuccessResponse | ErrorResponse>) => {        if (value.data instanceof ErrorResponse) {          resolve(false);        }        resolve(true);      });    }));  }  private createMessage(channelId: string,                        text?: string,                        attachments?: MessageAttachment[],                        replace_original: boolean = true): Message {    return {      token: this.token,      text,      channel: channelId,      attachments,      replace_original,    };  }  private async createAttachments(color: string,                                  callbackId: string,                                  title: string,                                  text?: string,                                  isRant: boolean = false,                                  userId?: string): Promise<MessageAttachment[]> {    console.log('in createAttachment');    const userInfo = await this.getUserInfo(userId);    const attachment: MessageAttachment = {      callback_id: callbackId,      fallback: this.fallbackText,      title,      text,      footer: 'Super Time Efficient Service',      ts: Date.now(),      color,    };    if (isRant && !userInfo.is_bot && !userInfo.is_app_user) {      attachment.author_name = userInfo.profile.display_name_normalized;      attachment.author_icon = userInfo.profile.image_24;      attachment.actions = [this.createMessageButton('comfort', `Comfort ${userInfo.profile.display_name}`, 'yes')];    }    return [attachment];  }  private createMessageButton(name: string, text: string, value: string): MessageAction {    return {      name,      text,      value,      type: 'button',    };  }  private async getUserInfo(userId: string) {    console.log('in getUserInfo');    const getUserInfoURL = `${this.userInfoURL}?user=${userId}`;    const response = await this._http.get<GetUserResponse>(getUserInfoURL, { headers: this.getHeaders() })      .toPromise();    if (!response.data || !response.data.ok) {      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);    }    return response.data.user;  }  private getHeaders(json: boolean = true) {    const headers = {};    if (json) {      headers['Content-Type'] = 'application/json';    } else {      headers['Content-Type'] = 'application/x-www-form-urlencoded';    }    headers['Authorization'] = `Bearer ${this.token}`;    return headers;  }}