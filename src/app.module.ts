import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { SlackModule } from './slack/slack.module';
import { NestRoutingModule } from './routes';
import { MessageModule } from './message/message.module';
import { AppController } from './app.controller';

@Module({
  imports: [SharedModule, NestRoutingModule, SlackModule, MessageModule],
  controllers: [AppController],
})
export class AppModule {
}
