import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user_crud',
      password: 'abc123',
      database: 'db_practica',
      autoLoadEntities: true,
      synchronize: true, // Que se migre automaticamente solo en desarrollo si ya se tien una base de datos
    }),
    UsersModule,
    EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }