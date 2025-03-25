import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {PrismaModule} from '../prisma/prisma.module'
import { ApiExceptionFilter } from 'src/common/filters/exception-filter';
import { APP_FILTER } from '@nestjs/core';


@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService, {
    provide: APP_FILTER,
    useClass: ApiExceptionFilter
  }]
})

export class TasksModule{}