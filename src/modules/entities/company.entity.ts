import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'company' })
export class CompanyEntity {
    @PrimaryColumn('uuid')
    @Generated('uuid')
    id: string;
    @Column({ type: 'varchar', length: 255 })
    nome: string;
    @Column({ type: 'varchar', unique: true, length: 20 })
    cnpj: string;
    @Column({
        name: 'company_email',
        type: 'varchar',
        unique: true,
        length: 255,
    })
    email: string;
    @Column({ type: 'varchar', length: 20 })
    phone: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    site?: string;
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
     * Relacionamento OneToMany 1:N
     * Um empresa pode ter vários funcionários
     */
    @OneToMany(() => EmployeeEntity, employee => employee.company)
    employees: EmployeeEntity[];

    @CreateDateColumn()
    createdAt?: Date;
    @UpdateDateColumn()
    updatedAt?: Date;
}
