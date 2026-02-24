import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly  userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const existEmail = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existEmail) throw new BadRequestException('El email ya esta registrado')
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`El usuario con el id ${id} no existe`)
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected === 0) throw new NotFoundException(`El usuario con el id ${id} no existe`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.userRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`El usuario con el id ${id} no existe`)
    return { message: `Usuario eliminado correctamente` }
  }
}