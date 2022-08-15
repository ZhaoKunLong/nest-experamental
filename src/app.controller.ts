import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':role')
  index(@Param('role') role: string, @Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, `${role}.html`)).toString());
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
