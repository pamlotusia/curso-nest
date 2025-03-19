import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService){}

  @Get()
  findAllTasks(){
    return this.taskService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.taskService.findOne(id)
  }

  @Post()
  createTask(@Body() body:any){
    console.log("Tarefa criada com sucesso!")
    return this.taskService.create(body)
  }

  @Patch(":id")
  updateTask(@Param('id') id:string, @Body() body:any){
    console.log("ID:", id)
    console.log("Body:", body)

    return 'Atualizando tarefas...'
  }

  @Delete(':id')
  deleteTask(@Param('id') id:string){
    console.log("ID enviado", id)
    return "Deletar a tarefa com o id " + id

  }



}
