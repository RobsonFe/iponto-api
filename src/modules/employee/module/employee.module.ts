import { EmployeeService } from './../service/employee.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EmployeeController } from '../controller/employee.controller';
import { EmployeeRepository } from '../repository/employee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/modules/entities/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity])],
    controllers: [EmployeeController],
    providers: [EmployeeService, EmployeeRepository],
    exports: [EmployeeService],
})
export class EmployeeModule {}
