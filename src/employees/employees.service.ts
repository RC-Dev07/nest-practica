import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findOne(id: number) {
    const emp = await this.employeeRepository.findOne({ where: { id } });
    if (!emp) throw new NotFoundException(`El empleado con id ${id} no existe`)
    return emp;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const result = await this.employeeRepository.update(id, updateEmployeeDto);
    if (result.affected === 0) throw new NotFoundException(`El empleado con el id ${id} no existe`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.employeeRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException(`El empleado con el id ${id} no existe`)
    return { message: 'Empleado eliminado correctamente' };
  }
}