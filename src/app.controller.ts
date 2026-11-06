import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  verificarApi() {
    return { mensagem: 'API de Controle Financeiro Pessoal funcionando!' };
  }
}
