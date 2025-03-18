import { NotFoundException } from '@nestjs/common';
import { EMPLOYEE_EXCEPTIONS } from '../constants/exceptions';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

export function validationCreateEmployee(data: any) {
    if (!data) {
        throw new NotFoundException(
            EMPLOYEE_EXCEPTIONS.COMPANY_NOT_FOUND
        );
    }
}
