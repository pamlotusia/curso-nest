import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      select:{
        id: true,
        email: true,
        name:true,
        Task: true
      }
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.prisma.user.findFirst({
        where: {
          email: createUserDto.email,
        },
      });

      if (userExists) {
        throw new HttpException('Usuário já cadastrado', HttpStatus.CONFLICT);
      }

      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          passwordHash: createUserDto.password,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return user;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Erro interno no servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: updateUserDto.name ? updateUserDto.name : user.name,
        },

        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return updatedUser;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new HttpException(
        'Falha ao atualizar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });

      return 'Usuário deletado com sucesso!';
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Falha ao atualizar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
