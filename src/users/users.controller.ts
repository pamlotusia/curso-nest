import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get(':id')
  FindOne(@Param('id', ParseIntPipe) id: number){
    return this.userService.findOne(id)
  }

  @Get()
  FindAllUsers(){
    return this.userService.findAll()
  }

  @Post()
  CreateUser(@Body() createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  @Patch(':id')
  UpdateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto){
    return this.userService.updateUser(id, updateUserDto)
  }

  @Delete(':id')
  DeleteUser(@Param('id', ParseIntPipe) id:number){
    return this.userService.deleteUser(id)
  }
}
