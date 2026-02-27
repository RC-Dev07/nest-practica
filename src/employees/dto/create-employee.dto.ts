import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateEmployeeDto {
    @IsString({ message: 'El nombre completo debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
    fullName: string;

    @IsString({ message: 'El cargo debe ser un texto' })
    @IsNotEmpty({ message: 'El cargo es obligatorio' })
    position: string;

    @IsNumber({}, { message: 'El salario debe ser un número' })
    @Min(0, { message: 'El salario no puede ser negativo' })
    salary: number;

    @IsOptional()
    @IsString({ message: 'El teléfono debe ser un texto' })
    phone?: string;
}