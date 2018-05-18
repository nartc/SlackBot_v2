import { HttpModule, Module } from '@nestjs/common';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [HttpModule, MessageModule],
  controllers: [SlackController],
  providers: [SlackService],
})
export class SlackModule {
}
