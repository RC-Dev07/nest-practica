import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

@ApiBearerAuth()
@ApiTags('Empleados Controller')
@Auth(Role.ADMIN)
@Controller('employees')
@UseGuards(AuthGuard, RolesGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo empleado' })
  @ApiResponse({ status: 201, description: 'Empleado creado correctamente.' })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener la lista de empleados' })
  @ApiResponse({ status: 200, description: 'Lista de empleados obtenida correctamente.' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un empleado por su ID' })
  @ApiResponse({ status: 200, description: 'Empleado obtenido correctamente.' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un empleado' })
  @ApiResponse({ status: 200, description: 'Empleado actualizado correctamente.' })
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un empleado' })
  @ApiResponse({ status: 200, description: 'Empleado eliminado correctamente.' })
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
