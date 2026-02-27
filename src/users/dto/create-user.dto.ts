import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {

    @IsString({ message: 'El nombre debe ser un texto' })
    name: string;

    @IsEmail({}, { message: 'El email no tiene un formato valido' })
    email: string;

    @IsString({ message: 'La contraseña debe ser un texto' })
    password: string;

    @IsOptional()
    @IsString({ message: 'El rol debe ser un texto' })
    rol?: string;
}