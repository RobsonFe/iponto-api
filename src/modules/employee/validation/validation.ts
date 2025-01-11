import { NotFoundException } from '@nestjs/common';
import { EMPLOYEE_EXCEPTIONS } from '../constants/exceptions';
import { error } from 'console';
import { EmployeeRepository } from '../repository/employee.repository';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

export function validationCreateEmployee(data: any) {
    if (!data) {
        throw new NotFoundException(
            EMPLOYEE_EXCEPTIONS.COMPANY_NOT_FOUND
        );
    }
}

export function validateUpdateEmployee(data: UpdateEmployeeDto) {
    if (!data) {
        throw new Error(EMPLOYEE_EXCEPTIONS.EMPLOYEE_NOT_UPDATED);
    }

    if (!data.companyId) {
        throw new NotFoundException(EMPLOYEE_EXCEPTIONS.COMPANY_NOT_FOUND);
    }
}
