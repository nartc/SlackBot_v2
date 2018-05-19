import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorResponse, Message, MessageAttachment, SlashCommandPayload, SuccessResponse } from './models/slack.model';
import { MessageService } from '../message/message.service';
import { ConfigService } from '../shared/services/config.service';
import { AxiosError, AxiosResponse } from '@nestjs/common/http/interfaces/axios.interfaces';

@Injectable()
export class SlackService {

  private readonly fallbackText: string = 'Your channel does not support me';
  private readonly token: string;
  private readonly rantChannelId: string;
  private readonly ahChannelId: string;

  constructor(private readonly _http: HttpService,
              private readonly _messageService: MessageService,
              private readonly _configService: ConfigService) {
    this.token = process.env.SLACK_TOKEN || _configService.get('SLACK_TOKEN');
    this.rantChannelId = process.env.SLACK_RANT_CHANNEL || _configService.get('SLACK_RANT_CHANNEL');
    this.ahChannelId = process.env.SLACK_AH_CHANNEL || _configService.get('SLACK_AH_CHANNEL');
  }

  async handleRant(actionPayload: SlashCommandPayload): Promise<any> {
    const { text, channel_id } = actionPayload;
    let message: Message;
    if (!text || text.trim() === null) {
      const messageText: string = 'Bi*ch! What the hell are you ranting on?!';
      const attachments = this.createAttachments('danger', 'rant_invoker', 'ERROR!!');
      message = this.createMessage(messageText, channel_id, attachments);
    } else {
      message = this.createMessage(text, this.rantChannelId, [], true);
    }
    await this.sendBotMessage(message);
    return;
  }

  private async sendBotMessage(message: Message): Promise<boolean> {
    const postMessageUrl: string = process.env.SLACK_POST_MESSAGE_URL || this._configService.get('SLACK_POST_MESSAGE_URL');
    return new Promise<boolean>((resolve => {
      this._http.post<SuccessResponse | ErrorResponse>(postMessageUrl, message, { headers: this.getHeaders() })
        .toPromise()
        .then((value: AxiosResponse<SuccessResponse | ErrorResponse>) => {
          if (value.data instanceof ErrorResponse) {
            resolve(false);
          }
          resolve(true);
        })
        .catch((error: AxiosError) => {
          throw new HttpException({
            status: HttpStatus.I_AM_A_TEAPOT,
            error,
            message: error.message,
          }, HttpStatus.I_AM_A_TEAPOT);
        });
    }));
  }

  private createMessage(text: string,
                        channelId: string,
                        attachments?: MessageAttachment[],
                        asUser: boolean = false): Message {

    return {
      token: this.token,
      text,
      channel: channelId,
      as_user: asUser,
      attachments,
      replace_original: !asUser,
    };
  }

  private createAttachments(color: string, callbackId: string, title: string, text?: string): MessageAttachment[] {
    return [{
      callback_id: callbackId,
      fallback: this.fallbackText,
      text,
      title,
      color,
    }];
  }

  private getHeaders() {
    return {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    };
  }
}
