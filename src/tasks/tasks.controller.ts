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
    return this.taskService.update(id, body)
  }

  @Delete(':id')
  deleteTask(@Param('id') id:string){
    return this.taskService.delete(id)
  }



}
