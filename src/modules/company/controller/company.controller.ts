/*
https://docs.nestjs.com/controllers#controllers
*/

import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyEntity } from 'src/modules/entities/company.entity';

@Controller('company')
export class CompanyController {
    constructor(private readonly service: CompanyService) {}

    @Post('save')
    async create(@Body() company: CreateCompanyDto): Promise<CompanyEntity> {
        console.log('Dados: ', company);
        return this.service.create(company);
    }

    @Get('list')
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
    ): Promise<CompanyEntity[]> {
        return this.service.findAll(page, limit);
    }

    @Patch(':id')
    async update( @Param('id') id: string, @Body() company: CreateCompanyDto): Promise<CompanyEntity | null> {
        return this.service.update(id, company);
    }


    @Get(':id')
    async findById(@Param('id') id: string): Promise<CompanyEntity | null> {
        return this.service.findById(id);
    }

    @Get('/count')
    async count(): Promise<number> {
        return this.service.count();
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
}
