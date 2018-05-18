import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SlashCommandPayload } from './models/slack.model';
import { SlackService } from './slack.service';
import { ConfigService } from '../shared/services/config.service';

@Controller()
export class SlackController {

  constructor(private readonly _slackService: SlackService,
              private readonly _configService: ConfigService) {
  }

  @Post('rant')
  async rantActionHandler(@Body() actionPayload: SlashCommandPayload): Promise<any> {
    const validateToken: string = this._configService.get('SLACK_VERIFICATION_TOKEN');
    if (actionPayload.token.trim() !== validateToken.trim()) {
      throw new HttpException('Request not validated', HttpStatus.BAD_REQUEST);
    }

    return await this._slackService.handleRant(actionPayload);
  }
}
