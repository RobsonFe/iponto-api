import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bem Vindo ao iPonto! um sistema de gerenciamento de ponto eletrônico e relatório de funcionários, todo o fluxo sendo gerenciado de forma inteligente e eficiente.';
  }
}
