import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 300 })
    fullName: string;

    @Column()
    position: string;

    @Column('decimal')
    salary: number;

    @Column({ nullable: true })
    phone: string;

    @DeleteDateColumn()
    deletedAt?: Date;
}