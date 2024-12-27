import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployerDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployerDto) {}
