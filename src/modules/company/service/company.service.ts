/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyRepository } from '../repository/company.repository';
import { CompanyEntity } from 'src/modules/entities/company.entity';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { COMPANY_EXCEPTIONS } from '../constants/exceptions';
import {
    validateUpdateCompany,
    validationCreateCompany,
} from '../validation/validation';

@Injectable()
export class CompanyService {
    constructor(private readonly repository: CompanyRepository) {}

    async create(createCompany: CreateCompanyDto): Promise<CompanyEntity> {
        try {
            const company = await this.repository.createCompany(createCompany);
            validationCreateCompany(company);
            return company;
        } catch (error) {
            console.error(error);
            if (error) {
                throw new Error(COMPANY_EXCEPTIONS.COMPANY_NOT_CREATED);
            }
        }
    }

    async findAll(page: number, limit: number): Promise<CompanyEntity[]> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<CompanyEntity | null> {
        return this.repository.findById(id);
    }

    async update(
        id: string,
        updateCompany: UpdateCompanyDto,
    ): Promise<CompanyEntity | null> {
        try {
            const existingCompany = await this.repository.findById(id);
            if (!existingCompany) {
                throw new Error(COMPANY_EXCEPTIONS.COMPANY_NOT_FOUND);
            }

            validateUpdateCompany(updateCompany);

            const updated = await this.repository.updateCompany(
                id,
                updateCompany,
            );
            return updated;
        } catch (error) {
            console.error(error);
            if (error) {
                throw new Error(COMPANY_EXCEPTIONS.COMPANY_NOT_UPDATED);
            }
        }
    }

    async delete(id: string): Promise<void> {
        return this.repository.deleteCompany(id);
    }

    async count(): Promise<number> {
        return this.repository.count();
    }
}
