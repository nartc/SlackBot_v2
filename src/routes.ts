import { RouterModule, Routes } from 'nest-router';
import { SlackModule } from './slack/slack.module';
import { Module } from '@nestjs/common';

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
];

@Module({
  imports: [RouterModule.forRoutes(routes)],
  exports: [RouterModule],
})
export class NestRoutingModule {

}