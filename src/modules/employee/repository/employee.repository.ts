import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/modules/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { CompanyEntity } from 'src/modules/entities/company.entity';

@Injectable()
export class EmployeeRepository {
    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly employeeRepository: Repository<EmployeeEntity>,
    ) {}
    
    /**
     * @description Método para criar um funcionário
     * @param createEmployee 
     * @returns employee - retorna o funcionário criado
     */
    async createEmployee(createEmployee: CreateEmployeeDto): Promise<EmployeeEntity> {
        const employee = this.employeeRepository.create(createEmployee);
        return await this.employeeRepository.save(employee);
    }

    /**
     * @description Método para listar todos os funcionários
     * @param page 
     * @param limit 
     * @returns EmployeeEntity[] - retorna um array de funcionários
     */
    async findAll(page: number, limit: number): Promise<EmployeeEntity[]> {
        const skip = (page - 1) * limit;

        return this.employeeRepository.find({
            skip,
            take: limit,
            order: { createdAt: 'ASC' }
        });
    }

    /**
     * @description Método para buscar um funcionário pelo ID
     * @param id 
     * @returns EmployeeEntity | null - retorna o funcionário ou null caso não encontre
     */
    async findById(id: string): Promise<EmployeeEntity | null> {
        return this.employeeRepository.findOne({ where: { id } });
    }

    /**
     * @description Método para atualizar um funcionário
     * @param id 
     * @param updateData 
     * @returns EmployeeEntity | null - retorna o funcionário atualizado ou null caso não encontre
     */
    async updateEmployee(id: string, updateData: UpdateEmployeeDto): Promise<EmployeeEntity | null> {
        const employee = await this.employeeRepository.findOne({
            where: { id },
            relations: ['company']
        });

        if (!employee) {
            throw new NotFoundException('Funcionário não encontrado');
        }

        // Atualiza endereço
        if (updateData.endereco) {
            employee.endereco = {
                ...employee.endereco,
                ...updateData.endereco
            };
        }

        // Atualiza empresa
        if (updateData.companyId) {
            employee.company = { id: updateData.companyId } as CompanyEntity;
        }

        const { companyId, ...updateDataWithoutCompany } = updateData;
        Object.assign(employee, updateDataWithoutCompany);

        return this.employeeRepository.save(employee);
    }

    /**
     * @description Método para deletar um funcionário
     * @param id 
     * @returns void
     */
    async deleteEmployee(id: string): Promise<void> {
        await this.employeeRepository.delete(id);
    }

    /**
     * @description Método para contar a quantidade de funcionários cadastrados no sistema
     * @returns number - com as quantidades de funcionários
     */
    async count(): Promise<number> {
        return this.employeeRepository.count();
    }
}
