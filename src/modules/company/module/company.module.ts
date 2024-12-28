/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CompanyController } from '../controller/company.controller';
import { CompanyService } from '../service/company.service';
import { CompanyRepository } from '../repository/company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/modules/entities/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyEntity])],
    controllers: [CompanyController],
    providers: [CompanyService, CompanyRepository],
    exports: [CompanyService],
})
export class CompanyModule {}
