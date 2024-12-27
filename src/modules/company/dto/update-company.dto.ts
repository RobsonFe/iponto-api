import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';

// Usando PartialType para simplificar e fazer os campos opcionais.
export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
