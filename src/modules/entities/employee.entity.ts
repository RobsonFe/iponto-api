import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'employee' })
export class EmployeeEntity {
    @PrimaryColumn('uuid')
    @Generated('uuid')
    id: string;
    @Column({ type: 'varchar', length: 255 })
    nome: string;
    @Column({ type: 'varchar', unique: true, length: 14 })
    cpf: string;
    @Column({
        name: 'employee_email',
        type: 'varchar',
        unique: true,
        length: 255,
    })
    email: string;
    @Column({ type: 'varchar', length: 20 })
    phone: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    linkedin?: string;
    @Column({ type: 'json' })
    endereco: {
        rua: string;
        numero?: string;
        complemento?: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    };
    /**
     * Relacionamento ManyToOne N:1
     * Muitos funcionários podem pertencer a uma empresa
     */
    @ManyToOne(() => CompanyEntity, company => company.employees, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    company: CompanyEntity;

    @CreateDateColumn()
    createdAt?: Date;
    @UpdateDateColumn()
    updatedAt?: Date;
}
