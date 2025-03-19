import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {

  private tasks: Task[] = [
    {
      id: 1,
      name: "Fazer autenticação de usuário",
      description: "A autenticação precisa estar de acordo com os parametros do banco",
      completed: false
    }

  ]

  findAll(){
    return this.tasks
  }

  findOne(id: string){
    if(this.tasks.find(task => task.id === Number(id))){
      return
    }
    else {
      return "Task not founded."
    }
  }

  create(body: any){
    const newId = this.tasks.length + 1

    const newTask = {
      id: newId,
      ...body,
    }

    this.tasks.push(newTask)

    return body
  }
}
