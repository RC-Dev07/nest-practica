import { BadRequestException, Injectable } from '@nestjs/common';
import bcryptjs from 'node_modules/bcryptjs';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register({ name, email, password }: RegisterDto) {
        const existEmail = await this.usersService.findOneByEmail(email);
        if (existEmail) throw new BadRequestException('El email ya esta registrado')

        const hashPassword = await bcryptjs.hash(password, 10);

        await this.usersService.create({
            name,
            email,
            rol: 'user',
            password: hashPassword,
        })
        return {
            name, email
        }
    }

    async login({ email, password }: LoginDto) {
        const userValid = await this.usersService.findOneByEmail(email);
        if (!userValid) throw new BadRequestException('Usuario no encontrado');
        const isPasswordValid = await bcryptjs.compare(password, userValid.password);
        if (!isPasswordValid) throw new BadRequestException('Contraseña incorrecta');

        const payload = { email: userValid.email };
        const token = await this.jwtService.signAsync(payload);


        return {
            name: userValid.name,
            email: userValid.email,
            rol: userValid.rol,
            token
        }
    }
}