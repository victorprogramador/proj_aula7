import { describe, expect, it, vi } from 'vitest';
import { Model } from 'mongoose';
import { Transacao } from '../src/transacoes/transacao.schema.js';
import { TransacoesService } from '../src/transacoes/transacoes.service.js';

const transacoesDeExemplo = [
  {
    descricao: 'Salário',
    valor: 2500,
    tipo: 'receita',
    categoria: 'Renda',
    consumoConsciente: true,
  },
  {
    descricao: 'Conta de luz',
    valor: 150.5,
    tipo: 'despesa',
    categoria: 'Moradia',
    consumoConsciente: true,
  },
  {
    descricao: 'Compra por impulso',
    valor: 49.99,
    tipo: 'despesa',
    categoria: 'Lazer',
    consumoConsciente: false,
  },
];

describe('TransacoesService', () => {
  it('devolve histórico e métricas consolidadas', async () => {
    const exec = vi.fn().mockResolvedValue(transacoesDeExemplo);
    const sort = vi.fn().mockReturnValue({ exec });
    const find = vi.fn().mockReturnValue({ sort });
    const model = { find } as unknown as Model<Transacao>;
    const service = new TransacoesService(model);

    const resposta = await service.listarComMetricas();

    expect(find).toHaveBeenCalledOnce();
    expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(resposta.historico).toEqual(transacoesDeExemplo);
    expect(resposta.metricas).toEqual({
      total: 2299.51,
      totalReceitas: 2500,
      totalDespesas: 200.49,
      totalGastoImpulso: 49.99,
    });
  });

  it('cadastra uma transação no model', async () => {
    const dados = {
      descricao: 'Mercado',
      valor: 87.25,
      tipo: 'despesa' as const,
      categoria: 'Alimentação',
      consumoConsciente: true,
    };
    const create = vi.fn().mockResolvedValue(dados);
    const service = new TransacoesService({ create } as unknown as Model<Transacao>);

    await expect(service.criar(dados)).resolves.toEqual(dados);
    expect(create).toHaveBeenCalledWith(dados);
  });
});
