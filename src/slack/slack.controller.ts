import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Response } from '@nestjs/common';
import { ActionPayload, SlashCommandPayload } from './models/slack.model';
import { SlackService } from './slack.service';
import { ConfigService } from '../shared/services/config.service';
import { Response as ExpressResponse } from 'express';
import { join } from 'path';

@Controller()
export class SlackController {

  constructor(private readonly _slackService: SlackService,
              private readonly _configService: ConfigService) {
  }

  @Post('rant')
  async rantActionHandler(@Body() actionPayload: SlashCommandPayload): Promise<any> {
    const validateToken: string = process.env.SLACK_VERIFICATION_TOKEN || this._configService.get('SLACK_VERIFICATION_TOKEN');
    if (actionPayload.token.trim() !== validateToken.trim()) {
      throw new HttpException('Request not validated', HttpStatus.BAD_REQUEST);
    }

    return await this._slackService.handleRant(actionPayload);
  }

  @Get('oauth')
  async oauthHandler(@Query('code') code: string, @Query('error') error: string, @Response() res: ExpressResponse): Promise<any> {
    if (error) {
      return res.sendFile(join(__dirname, '../../public/index.html'));
    }

    const result = await this._slackService.handleOAuth(code);

    if (result) {
      return res.sendFile(join(__dirname, '../../public/index.html'));
    }
  }

  @Post('action')
  async actionHandler(@Body('payload') payloadString: string): Promise<any> {
    const actionPayload: ActionPayload = JSON.parse(payloadString);
    let result;
    if (actionPayload.actions[0].value === 'comfort') {
      result = await this._slackService.handleComfortAction(actionPayload);
    } else if (actionPayload.actions[0].value === 'in-your-face') {
      result = await this._slackService.handleInYourFaceAction(actionPayload);
    }

    return result;
  }
}
