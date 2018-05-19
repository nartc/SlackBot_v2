import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [prop: string]: string };

  // static connectionString: string;

  constructor(filePath: string) {
    this.envConfig = parse(readFileSync(filePath));
    // ConfigService.connectionString = this.get('MONGO_URI');
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
