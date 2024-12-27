/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CompanyService } from './service/company.service';
import { CompanyRepository } from './repository/company.repository';
import { CompanyController } from './controller/company.controller';

@Module({
    imports: [],
    controllers: [CompanyController],
    providers: [CompanyService, CompanyRepository],
    exports: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
