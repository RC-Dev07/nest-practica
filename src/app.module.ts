import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { UsersModule } from './users/users.module';

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
      synchronize: true,
    }),
    UsersModule,
    EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }