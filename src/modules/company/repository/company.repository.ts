import { Inject, Injectable } from '@nestjs/common';
import { CompanyEntity } from '../entities/company.entity';

@Injectable()
export class CompanyRepository {
    constructor(
        @Inject('COMPANY_REPOSITORY')
        private readonly companyRepository: typeof CompanyEntity,
    ) {}
}
