import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(paginationDto?:PaginationDto) {
    const limit = paginationDto?.limit ?? 10;
    const offset = paginationDto?.offset ?? 0;

    const allTasks = await this.prisma.task.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc"
      }
    });
    return allTasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (task?.name) return task;

    throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
  }

  async create(createTaskDto: CreateTaskDto) {
    try{
      const newTask = await this.prisma.task.create({
        data: {
          name: createTaskDto.name,
          description: createTaskDto.description,
          completed: createTaskDto.completed ?? false,
          userId: createTaskDto.userId
        },
      });

      return newTask;
    }
    catch{
      throw new HttpException("Falha ao cadastrar tarefa.", HttpStatus.BAD_REQUEST)
    }

  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const currTask = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (!currTask) {
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }

    const task = await this.prisma.task.update({
      where: {
        id: id,
      },
      data:{
        name: updateTaskDto?.name ? updateTaskDto?.name : currTask.name,
        description: updateTaskDto?.description ? updateTaskDto?.description : currTask.description,
        completed: updateTaskDto?.completed ? updateTaskDto?.completed : currTask.completed,
      }
    });
    return task;
  }

  async delete(id: number) {
    try {
      const currTask = await this.prisma.task.findFirst({
        where: {
          id: id,
        },
      });

      if (!currTask) {
        throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
      }

      await this.prisma.task.delete({
        where: {
          id: currTask.id,
        },
      });

      return 'Tarefa deletada com sucesso!';

    } catch (err) {
      throw new HttpException('Falha ao deletar essa tarefa.', HttpStatus.BAD_REQUEST);
    }
  }
}
