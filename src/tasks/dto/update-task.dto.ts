import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types'

export class UpdateTaskDto extends PartialType(CreateTaskDto){
  @IsBoolean()
  @IsOptional()
  readonly completed?:boolean;
}