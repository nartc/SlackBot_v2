import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { SlackModule } from './slack/slack.module';
import { NestRoutingModule } from './routes';
import { MessageModule } from './message/message.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './shared/services/config.service';

@Module({
  imports: [SharedModule, NestRoutingModule, SlackModule, MessageModule],
  controllers: [AppController],
})
export class AppModule {
}
