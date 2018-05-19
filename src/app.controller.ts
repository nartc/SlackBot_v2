import { Controller, Get, Response } from '@nestjs/common';
import { Response as ExpressRequest } from 'express';
import { join } from 'path';

@Controller()
export class AppController {

  @Get()
  async getHome(@Response() res: ExpressRequest): Promise<any> {
    return res.sendFile(join(__dirname, '../public/index.html'));
  }
}
