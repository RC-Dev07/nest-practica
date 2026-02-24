import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    fullName: string;

    @IsString()
    position: string;

    @IsNumber()
    salary: number;

    @IsOptional()
    @IsString()
    phone?: string;
}
