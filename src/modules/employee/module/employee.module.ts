import { EmployeeService } from './../service/employee.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EmployeeController } from '../controller/employee.controller';
import { EmployeeRepository } from '../repository/employee.repository';

@Module({
    imports: [],
    controllers: [EmployeeController],
    providers: [EmployeeService, EmployeeRepository],
    exports: [EmployeeService],
})
export class EmployeeModule {}
