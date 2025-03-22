import { PaginationDto } from "src/modules/dto/pagination/pagination-dto";
import { CreateEmployeeDto } from "src/modules/employee/dto/create-employee.dto";
import { UpdateEmployeeDto } from "src/modules/employee/dto/update-employee.dto";
import { EmployeeEntity } from "src/modules/entities/employee.entity";

export abstract class EmployeeContract {
    abstract createEmployee(createEmployee: CreateEmployeeDto): Promise<EmployeeEntity>;

    abstract findAll(pagination:PaginationDto): Promise<EmployeeEntity[]>;

    abstract findById(id: string): Promise<EmployeeEntity | null>;

    abstract update(id: string, updateData: UpdateEmployeeDto): Promise<EmployeeEntity | null>;

    abstract delete(id: string): Promise<void>;

    abstract count(): Promise<number>;
}
