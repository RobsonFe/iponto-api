import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('App')
  @ApiOperation({ 
    summary: 'Bem Vindo ao iPonto!',
    description: 'API para controle de ponto eletrônico e sistema de gerenciamento de desempenho de funcionários.'
 })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
