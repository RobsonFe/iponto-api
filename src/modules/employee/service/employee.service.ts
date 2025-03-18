/*
https://docs.nestjs.com/providers#services
*/

import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '../repository/employee.repository';
import { EmployeeEntity } from 'src/modules/entities/employee.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { CompanyService } from 'src/modules/company/service/company.service';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { validationCreateEmployee } from '../validation/validation';
import { EMPLOYEE_EXCEPTIONS } from '../constants/exceptions';

@Injectable()
export class EmployeeService {
    constructor(
        private readonly repository:EmployeeRepository,
        private readonly company: CompanyService
    ) {}

    async createEmployee(createEmployee: CreateEmployeeDto): Promise<EmployeeEntity> {

        try {
            const company = await this.company.findById(createEmployee.companyId);
            
            validationCreateEmployee(company);
            
            return this.repository.createEmployee({
                ...createEmployee,
                companyId: company.id
            });
        } catch (error) {
            console.error(error);
            if (error) {
                throw new Error(EMPLOYEE_EXCEPTIONS.EMPLOYEE_NOT_CREATED);
            }
        }
    }

    async findAll(page: number, limit: number): Promise<EmployeeEntity[]> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<EmployeeEntity | null> {
        return this.repository.findById(id);
    }

    async update(id: string, updateData: UpdateEmployeeDto): Promise<EmployeeEntity | null> {
        try {
            // Verifica se o funcionário existe
            const existingEmployee = await this.repository.findById(id);
            if (!existingEmployee) {
                throw new NotFoundException(EMPLOYEE_EXCEPTIONS.EMPLOYEE_NOT_FOUND);
            }

            // Atualiza funcionário
            const updated = await this.repository.updateEmployee(id, updateData);
            return updated;

        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Erro ao atualizar funcionário');
        }
    }

    async delete(id: string): Promise<void> {
        return this.repository.deleteEmployee(id);
    }

    async count(): Promise<number> {
        return this.repository.count();
    }

}
