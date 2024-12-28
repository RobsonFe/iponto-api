/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyRepository } from '../repository/company.repository';
import { CompanyEntity } from 'src/modules/entities/company.entity';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class CompanyService {
    constructor(private readonly company: CompanyRepository) {}

    async create(createCompany: CreateCompanyDto): Promise<CompanyEntity> {
        return this.company.createCompany(createCompany);
    }

    async findAll(page: number, limit: number): Promise<CompanyEntity[]> {
        return this.company.findAll(page, limit);
    }

    async findById(id: string): Promise<CompanyEntity | null> {
        return this.company.findById(id);
    }

    async update(
        id: string,
        updateCompany: UpdateCompanyDto,
    ): Promise<CompanyEntity | null> {
        return this.company.updateCompany(id, updateCompany);
    }

    async delete(id: string): Promise<void> {
        return this.company.deleteCompany(id);
    }

    async count(): Promise<number> {
        return this.company.count();
    }
}
