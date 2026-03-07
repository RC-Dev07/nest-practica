import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateEmployeeDto {
    @ApiProperty({ description: 'Nombre completo del empleado', example: 'Juan Pérez' })
    @IsString({ message: 'El nombre completo debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
    fullName: string;

    @ApiProperty({ description: 'Cargo del empleado', example: 'Desarrollador' })
    @IsString({ message: 'El cargo debe ser un texto' })
    @IsNotEmpty({ message: 'El cargo es obligatorio' })
    position: string;

    @ApiProperty({ description: 'Salario del empleado', example: 50000 })
    @IsNumber({}, { message: 'El salario debe ser un número' })
    @Min(0, { message: 'El salario no puede ser negativo' })
    salary: number;

    @ApiProperty({ description: 'Teléfono del empleado', example: '61225454' })
    @IsOptional()
    @IsString({ message: 'El teléfono debe ser un texto' })
    phone?: string;
}