import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { SlackModule } from './slack/slack.module';
import { NestRoutingModule } from './routes';
import { MessageModule } from './message/message.module';

@Module({
  imports: [SharedModule, NestRoutingModule, SlackModule, MessageModule],
})
export class AppModule {
}
