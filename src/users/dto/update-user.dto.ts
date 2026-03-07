// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger'; //Para documentacion de dto en swagger derivados
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }
