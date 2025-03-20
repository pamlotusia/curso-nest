import { UpdateTaskDto } from './dto/update-task.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Fazer autenticação de usuário',
      description:
        'A autenticação precisa estar de acordo com os parametros do banco',
      completed: false,
    },
  ];

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if(!task){
      throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
    }
    return task
  }

  create(createTaskDto:CreateTaskDto) {
    const newId = this.tasks.length + 1;

    const newTask = {
      id: newId,
      ...createTaskDto,
      completed: false
    };

    this.tasks.push(newTask);
    console.log(newTask)

    return createTaskDto;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex < 0) {
      throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
    } 
    const taskItem = this.tasks[taskIndex];

    this.tasks[taskIndex] = {
      ...taskItem,
      ...updateTaskDto,
    };

    return 'Tarefa atualizada com sucesso!';
  }

  delete(id: number){
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex < 0) {
      throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
    }

    this.tasks.splice(taskIndex, 1)
    return "Tarefa excluída com sucesso!"
  }
}
