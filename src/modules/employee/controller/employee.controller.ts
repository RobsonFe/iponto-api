/*
https://docs.nestjs.com/controllers#controllers
*/

import { 
    Body, 
    ConflictException, 
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    HttpStatus, 
    InternalServerErrorException, 
    Param,  
    Patch, 
    Post, 
    Query 
} from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeeEntity } from 'src/modules/entities/employee.entity';
import { EMPLOYEE_EXCEPTIONS } from '../constants/exceptions';
import { CountEmployeesDoc, CreateEmployeeDoc, DeleteEmployeeDoc, EmployeeContractApi, FindAllEmployeesDoc, FindEmployeeByIdDoc, UpdateEmployeeDoc } from '../contracts/employee-contract-doc';
import { PaginationDto } from 'src/modules/dto/pagination/pagination-dto';
import { EmployeeContract } from '../contracts/employee-contract';

@Controller('employee')
@EmployeeContractApi()
export class EmployeeController implements EmployeeContract {
    constructor(private readonly service: EmployeeService) {}

    @Post('save')
    @HttpCode(HttpStatus.CREATED)
    @CreateEmployeeDoc()
    async createEmployee(@Body() employee: CreateEmployeeDto): Promise<EmployeeEntity> {
        try {
            const newEmployee = await this.service.createEmployee(employee);
            return newEmployee;
        } catch (error) {
            if (error.code === '23505') { 
                throw new ConflictException(EMPLOYEE_EXCEPTIONS.EMPLOYEE_ALREADY_EXISTS);
            }
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @Get('list')
    @HttpCode(HttpStatus.OK)
    @FindAllEmployeesDoc()
    async findAll(
        @Query() pagination:PaginationDto
    ): Promise<EmployeeEntity[]> {
        try {
            return this.service.findAll(pagination);
        } catch (error) {
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @Get('find/:id')
    @HttpCode(HttpStatus.OK)
    @FindEmployeeByIdDoc()
    async findById(@Query('id') id: string): Promise<EmployeeEntity | null> {
        try {
            return this.service.findById(id);
        } catch (error) {
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @Patch('update/:id')
    @HttpCode(HttpStatus.OK)
    @UpdateEmployeeDoc()
    async update(@Param('id') id: string, @Body() employee: CreateEmployeeDto): Promise<EmployeeEntity | null> {
        try {
            return this.service.update(id, employee);
        } catch (error) {
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @DeleteEmployeeDoc()
    async delete(@Param('id') id: string): Promise<void> {
        try {
            return this.service.delete(id);
        } catch (error) {
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @Get('count')
    @HttpCode(HttpStatus.OK)
    @CountEmployeesDoc()
    async count(): Promise<number> {
        try {
            return this.service.count();
        } catch (error) {
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}
