import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
<<<<<<< Updated upstream
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './shared/services/config.service';
=======
<<<<<<< HEAD
=======
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './shared/services/config.service';
>>>>>>> 2fd3d22... intial
>>>>>>> Stashed changes
import { SlackModule } from './slack/slack.module';
import { NestRoutingModule } from './routes';
import { MessageModule } from './message/message.module';

@Module({
<<<<<<< Updated upstream
  imports: [SharedModule, NestRoutingModule, MongooseModule.forRoot(ConfigService.connectionString), SlackModule, MessageModule],
=======
<<<<<<< HEAD
  imports: [SharedModule, NestRoutingModule, SlackModule, MessageModule],
=======
  imports: [SharedModule, NestRoutingModule, MongooseModule.forRoot(ConfigService.connectionString), SlackModule, MessageModule],
>>>>>>> 2fd3d22... intial
>>>>>>> Stashed changes
})
export class AppModule {
}
