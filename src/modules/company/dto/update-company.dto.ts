import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateAddressDto {
    @IsOptional()
    @IsString()
    rua?: string;

    @IsOptional()
    @IsString()
    numero?: string;

    @IsOptional()
    @IsString()
    complemento?: string;

    @IsOptional()
    @IsString()
    bairro?: string;

    @IsOptional()
    @IsString()
    cidade?: string;

    @IsOptional()
    @IsString()
    estado?: string;

    @IsOptional()
    @IsString()
    cep?: string;
}

export class UpdateCompanyDto {
    @IsOptional()
    @IsString()
    readonly nome?: string;

    @IsOptional()
    @IsString()
    readonly cnpj?: string;

    @IsOptional()
    @IsString()
    readonly email?: string;

    @IsOptional()
    @IsString()
    readonly phone?: string;

    @IsOptional()
    @IsString()
    readonly site?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateAddressDto)
    readonly endereco?: UpdateAddressDto;
}
