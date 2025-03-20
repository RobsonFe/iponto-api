/*
https://docs.nestjs.com/controllers#controllers
*/

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyEntity } from 'src/modules/entities/company.entity';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyContractApi, CountCompaniesDoc, CreateCompanyDoc, DeleteCompanyDoc, FindAllCompaniesDoc, FindCompanyByIdDoc, UpdateCompanyDoc } from '../contracts/company-contract-api';
import { PaginationDto } from 'src/modules/dto/pagination/pagination-dto';

@Controller('company')
@CompanyContractApi()
export class CompanyController {
    constructor(private readonly service: CompanyService) {}

    @Post('save')
    @CreateCompanyDoc()
    async create(@Body() company: CreateCompanyDto): Promise<CompanyEntity> {
        return this.service.create(company);
    }

    @Get('list')
    @FindAllCompaniesDoc()
    async findAll(@Query() pagination?: PaginationDto): Promise<CompanyEntity[]> {
        return this.service.findAll(pagination);
    }

    @Patch('update/:id')
    @UpdateCompanyDoc()
    async update( @Param('id') id: string, @Body() company: UpdateCompanyDto): Promise<CompanyEntity | null> {
        return this.service.update(id, company);
    }


    @Get('find/:id')
    @FindCompanyByIdDoc()
    async findById(@Param('id') id: string): Promise<CompanyEntity | null> {
        return this.service.findById(id);
    }

    @Get('count')
    @CountCompaniesDoc()
    async count(): Promise<number> {
        return this.service.count();
    }

    @Delete('delete/:id')
    @DeleteCompanyDoc()
    async delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
}
