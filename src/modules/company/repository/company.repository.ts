import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/modules/entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { PaginationDto } from 'src/modules/dto/pagination/pagination-dto';
import { Console } from 'console';

@Injectable()
export class CompanyRepository {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
    ) {}

    /**
     * @description Método para criar uma empresa
     * @param createCompany
     * @returns company - retorna a empresa criada
     */
    async createCompany(createCompany: CreateCompanyDto): Promise<CompanyEntity> {
        const company = this.companyRepository.create(createCompany);
        return await this.companyRepository.save(company);
    }

    /**
     * @description Método para buscar uma empresa pelo CNPJ
     * @param cnpj
     * @returns CompanyEntity | null - retorna a empresa ou null caso não encontre
     */
    async updateCompany(id: string,updateData: UpdateCompanyDto): Promise<CompanyEntity | null> {
        const company = await this.companyRepository.findOne({ where: { id } });
        if (!company) return null;
        Object.assign(company, updateData); // atualiza os dados da empresa sem sobrescrever tudo, melhorando a performance
        return await this.companyRepository.save(company);
    }

    /**
     * @description Método para listar todas as empresas
     * @param page
     * @param limit
     * @returns CompanyEntity[] - retorna um array de empresas
     */
    async findAll(pagination?:PaginationDto): Promise<CompanyEntity[]> {
        const skip =  pagination?.page ? (pagination.page - 1) * (pagination.limit || 10) : undefined;
        const limit = pagination?.limit;

        return this.companyRepository.find({
            skip,
            take: limit,
            order: { createdAt: 'ASC' }
        });
    }

    /**
     * @description Método para contar a quantidade de empresas cadastradas no sistema
     * @returns number - com as quantidades de empresas
     */
    async count(): Promise<number> {
        return this.companyRepository.count();
    }

    /**
     * @description Método para buscar uma empresa pelo ID
     * @param id
     * @returns CompanyEntity | null - retorna a empresa ou null caso não encontre
     */
    async findById(id: string): Promise<CompanyEntity | null> {
        return this.companyRepository.findOne({ where: { id } });
    }

    /**
     * @description Método para deletar uma empresa
     * @param id
     */
    async deleteCompany(id: string): Promise<void> {
        await this.companyRepository.delete(id);
    }
}
