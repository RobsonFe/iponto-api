import { PaginationDto } from "src/modules/dto/pagination/pagination-dto";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { CompanyEntity } from "src/modules/entities/company.entity";
import { UpdateCompanyDto } from "../dto/update-company.dto";


export abstract class CompanyContract {
    abstract create(createCompany: CreateCompanyDto): Promise<CompanyEntity>;

    abstract findAll(pagination:PaginationDto): Promise<CompanyEntity[]>;

    abstract findById(id: string): Promise<CompanyEntity | null>;

    abstract update(id: string, updateData: UpdateCompanyDto): Promise<CompanyEntity | null>;

    abstract delete(id: string): Promise<void>;

    abstract count(): Promise<number>;
}
