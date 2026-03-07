import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from './enums/rol.enum';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register(dto: RegisterDto) {

        const { name, email, password, role } = dto;

        const existEmail = await this.usersService.findOneByEmail(email);

        if (existEmail) {
            throw new BadRequestException('El email ya está registrado');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const roleValue = role ?? Role.USER;

        await this.usersService.create({
            name,
            email,
            role: roleValue,
            password: hashPassword,
        });

        return { name, email };
    }

    async login({ email, password }: LoginDto) {
        const userValid = await this.usersService.findOneByEmail(email);
        if (!userValid) throw new BadRequestException('Usuario no encontrado');
        const isPasswordValid = await bcrypt.compare(password, userValid.password);
        if (!isPasswordValid) throw new BadRequestException('Contraseña incorrecta');

        const payload = { email: userValid.email, role: userValid.role };
        const token = await this.jwtService.signAsync(payload);
        return {
            name: userValid.name,
            email: userValid.email,
            role: userValid.role,
            token
        }
    }
}