import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class PaginationDto{
  @IsInt()
  @Type(() => Number)
  limit: number;
  
  @IsInt()
  @Type(() => Number)
  offset: number;
}