import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './shared/services/config.service';
=======
=======
>>>>>>> Stashed changes
<<<<<<< HEAD
=======
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './shared/services/config.service';
>>>>>>> 2fd3d22... intial
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import { SlackModule } from './slack/slack.module';
import { NestRoutingModule } from './routes';
import { MessageModule } from './message/message.module';

@Module({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  imports: [SharedModule, NestRoutingModule, MongooseModule.forRoot(ConfigService.connectionString), SlackModule, MessageModule],
=======
=======
>>>>>>> Stashed changes
<<<<<<< HEAD
  imports: [SharedModule, NestRoutingModule, SlackModule, MessageModule],
=======
  imports: [SharedModule, NestRoutingModule, MongooseModule.forRoot(ConfigService.connectionString), SlackModule, MessageModule],
>>>>>>> 2fd3d22... intial
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
})
export class AppModule {
}
