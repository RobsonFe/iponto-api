/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CompanyController } from '../controller/company.controller';
import { CompanyService } from '../service/company.service';
import { CompanyRepository } from '../repository/company.repository';

@Module({
    imports: [],
    controllers: [CompanyController],
    providers: [CompanyService, CompanyRepository],
    exports: [CompanyService],
})
export class CompanyModule {}
