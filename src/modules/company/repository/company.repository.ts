import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository {
    constructor() {
        console.log('CompanyRepository Instanciada');
    }
}
