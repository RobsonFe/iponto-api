import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('App')
  @ApiHeader({
    name: 'Bem Vindo ao iPonto',
    description: 'Bem Vindo ao iPonto! um sistema de gerenciamento de ponto eletrônico e relatório de funcionários, todo o fluxo sendo gerenciado de forma inteligente e eficiente.',
  })
  @ApiOperation({ summary: 'Bem Vindo ao iPonto!' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
