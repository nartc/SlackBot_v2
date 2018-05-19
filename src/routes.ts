import { RouterModule, Routes } from 'nest-router';
import { SlackModule } from './slack/slack.module';
import { Module } from '@nestjs/common';
import { AppModule } from './app.module';

const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/slack',
        module: SlackModule,
      },
    ],
  },
  {
    path: '/',
    module: AppModule,
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes)],
  exports: [RouterModule],
})
export class NestRoutingModule {

}