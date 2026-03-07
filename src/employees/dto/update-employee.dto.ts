// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger'; //Para documentacion de dto en swagger derivados
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) { }
