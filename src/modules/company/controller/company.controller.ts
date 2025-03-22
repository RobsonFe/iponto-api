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
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyEntity } from 'src/modules/entities/company.entity';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyContractApi, CountCompaniesDoc, CreateCompanyDoc, DeleteCompanyDoc, FindAllCompaniesDoc, FindCompanyByIdDoc, UpdateCompanyDoc } from '../contracts/company-contract-doc';
import { PaginationDto } from 'src/modules/dto/pagination/pagination-dto';
import { CompanyContract } from '../contracts/company-contract';

@Controller('company')
@CompanyContractApi()
export class CompanyController implements CompanyContract {
    constructor(private readonly service: CompanyService) {}

    @Post('save')
    @CreateCompanyDoc()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() company: CreateCompanyDto): Promise<CompanyEntity> {
        return this.service.create(company);
    }

    @Get('list')
    @FindAllCompaniesDoc()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() pagination?: PaginationDto): Promise<CompanyEntity[]> {
        return this.service.findAll(pagination);
    }

    @Patch('update/:id')
    @UpdateCompanyDoc()
    @HttpCode(HttpStatus.OK)
    async update( @Param('id') id: string, @Body() company: UpdateCompanyDto): Promise<CompanyEntity | null> {
        return this.service.update(id, company);
    }


    @Get('find/:id')
    @FindCompanyByIdDoc()
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: string): Promise<CompanyEntity | null> {
        return this.service.findById(id);
    }

    @Get('count')
    @CountCompaniesDoc()
    @HttpCode(HttpStatus.OK)
    async count(): Promise<number> {
        return this.service.count();
    }

    @Delete('delete/:id')
    @DeleteCompanyDoc()
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
}
