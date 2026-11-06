# Projeto Aula 7 — Controle Financeiro Pessoal

API REST feita com NestJS e MongoDB para registrar receitas e despesas. A ideia é ajudar no acompanhamento dos gastos do dia a dia e incentivar uma reflexão sobre consumo consciente, em alinhamento com os ODS 1 e 12 citados no enunciado.

## O que a API faz

- `POST /transacoes`: cadastra uma receita ou despesa.
- `GET /transacoes`: devolve o histórico e as métricas calculadas no service.
- `GET /`: informa que a API está funcionando.

No retorno de `GET /transacoes`, `saldoTotal` é o saldo (receitas menos despesas), `totalDespesas` soma as despesas e `totalGastoImpulso` soma as despesas marcadas com `consumoConsciente: false`.

## Como executar

1. Instale Node.js e npm e tenha acesso a um cluster MongoDB Atlas (ou MongoDB local).
2. Copie `.env.example` para `.env` e substitua `MONGODB_URI` pela URI do seu cluster. No Atlas, libere o IP usado para a conexão e crie um usuário de banco. Não publique o arquivo `.env` nem a senha.
3. Rode `npm install`.
4. Rode `npm run start` ou, para desenvolvimento, `npm run start:dev`.
5. Abra `http://localhost:3000` para conferir a mensagem da API.

## Exemplo de cadastro

Envie um `POST` para `http://localhost:3000/transacoes` com `Content-Type: application/json`:

```json
{
  "descricao": "Conta de luz",
  "valor": 150.5,
  "tipo": "despesa",
  "categoria": "Moradia",
  "consumoConsciente": true
}
```

`tipo` aceita somente `receita` ou `despesa`; `valor` deve ser positivo. Um exemplo de despesa por impulso usa `"consumoConsciente": false`.

## Testes

- `npm test` executa os testes unitários do cálculo e cadastro.
- `npm run build` verifica a compilação TypeScript.

## Observação

O projeto foi desenvolvido como atividade acadêmica individual. O histórico Git registra as datas reais em que os commits foram feitos.
