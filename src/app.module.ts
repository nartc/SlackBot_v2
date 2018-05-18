import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './shared/services/config.service';
import { SlackModule } from './slack/slack.module';
import { NestRoutingModule } from './routes';
import { MessageModule } from './message/message.module';

@Module({
  imports: [SharedModule, NestRoutingModule, MongooseModule.forRoot(ConfigService.connectionString), SlackModule, MessageModule],
})
export class AppModule {
}
