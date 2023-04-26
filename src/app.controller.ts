import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
