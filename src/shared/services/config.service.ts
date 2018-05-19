import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [prop: string]: string };
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
<<<<<<< HEAD

  // static connectionString: string;

  constructor(filePath: string) {
    this.envConfig = parse(readFileSync(filePath));
    // ConfigService.connectionString = this.get('MONGO_URI');
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  static connectionString: string;

  constructor(filePath: string) {
    this.envConfig = parse(readFileSync(filePath));
    ConfigService.connectionString = this.get('MONGO_URI');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
>>>>>>> 2fd3d22... intial
>>>>>>> Stashed changes
=======
>>>>>>> 2fd3d22... intial
>>>>>>> Stashed changes
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
