import { Body, Controller, Get, Param, Patch, Post, Delete, ParseIntPipe, Query, UseInterceptors, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { AuthGuard } from 'src/common/guards/admin.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
@UseInterceptors(LoggerInterceptor)
export class TasksController {
  constructor(private readonly taskService: TasksService){}

  @Get()
  findAllTasks(@Query() paginationDto: PaginationDto){
    return this.taskService.findAll(paginationDto)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.taskService.findOne(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto){
    return this.taskService.create(createTaskDto)
  }

  @Patch(":id")
  updateTask(@Param('id', ParseIntPipe) id:number, @Body() updateTaskDto:UpdateTaskDto){
    return this.taskService.update(id, updateTaskDto)
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id:number){
    return this.taskService.delete(id)
  }



}
