/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyRepository } from '../repository/company.repository';

@Injectable()
export class CompanyService {
    private readonly company: CompanyRepository;

    constructor() {}

    createCompany(createCompany: CreateCompanyDto): string {
        return 'Adiciona uma nova empresa';
    }
}
