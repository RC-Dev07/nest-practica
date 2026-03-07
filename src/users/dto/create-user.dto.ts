import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/auth/enums/rol.enum';

export class CreateUserDto {

    @IsString({ message: 'El nombre debe ser un texto' })
    name: string;

    @IsEmail({}, { message: 'El email no tiene un formato valido' })
    email: string;

    @IsString({ message: 'La contraseña debe ser un texto' })
    password: string;

    @IsEnum(Role, { message: `El rol debe ser uno de los siguientes: ${Object.values(Role).join(', ')}` })
    role?: Role;
}