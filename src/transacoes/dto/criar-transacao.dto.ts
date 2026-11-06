import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { TipoTransacao } from '../transacao.schema.js';

export class CriarTransacaoDto {
  @IsString()
  @MinLength(2)
  descricao!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  valor!: number;

  @IsEnum(TipoTransacao)
  tipo!: TipoTransacao;

  @IsString()
  @MinLength(2)
  categoria!: string;

  @IsBoolean()
  consumoConsciente!: boolean;
}
