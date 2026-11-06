import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarTransacaoDto } from './dto/criar-transacao.dto.js';
import { Transacao } from './transacao.schema.js';

export interface MetricasTransacoes {
  saldoTotal: number;
  totalDespesas: number;
  totalGastoImpulso: number;
}

export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private readonly transacaoModel: Model<Transacao>,
  ) {}

  async criar(dados: CriarTransacaoDto) {
    return this.transacaoModel.create(dados);
  }

  async listarComMetricas() {
    const historico = await this.transacaoModel
      .find()
      .sort({ createdAt: -1 })
      .exec();

    const centavos = (valor: number) => Math.round(valor * 100);
    const totalReceitasCentavos = historico
      .filter((transacao) => transacao.tipo === 'receita')
      .reduce((soma, transacao) => soma + centavos(transacao.valor), 0);
    const totalDespesasCentavos = historico
      .filter((transacao) => transacao.tipo === 'despesa')
      .reduce((soma, transacao) => soma + centavos(transacao.valor), 0);
    const totalGastoImpulsoCentavos = historico
      .filter(
        (transacao) =>
          transacao.tipo === 'despesa' && !transacao.consumoConsciente,
      )
      .reduce((soma, transacao) => soma + centavos(transacao.valor), 0);

    const emReais = (valorEmCentavos: number) => valorEmCentavos / 100;
    const metricas: MetricasTransacoes = {
      saldoTotal: emReais(totalReceitasCentavos - totalDespesasCentavos),
      totalDespesas: emReais(totalDespesasCentavos),
      totalGastoImpulso: emReais(totalGastoImpulsoCentavos),
    };

    return { historico, metricas };
  }
}
