import { IsNumberOptions } from './../../../node_modules/class-validator/types/decorator/typechecker/IsNumber.d';
/*
  DTO > Data Transfer Object (Objeto de transferencia de dados)
  > validar dados, transformar dados
  > se usa para representar quais dados e em que formatos uma determinada camada aceita e trabalha

*/

import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTaskDto{
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}