import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';

const environmentHosting: string = process.env.NODE_ENV || 'development';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`${environmentHosting}.env`),
    },
  ],
  exports: [ConfigService],
})
export class SharedModule {
}
