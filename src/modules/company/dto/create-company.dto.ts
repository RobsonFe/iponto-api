import {
    IsString,
    IsOptional,
    ValidateNested,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
    @IsString()
    @IsNotEmpty()
    rua: string;

    @IsOptional()
    @IsString()
    numero?: string;

    @IsOptional()
    @IsString()
    complemento?: string;

    @IsString()
    @IsNotEmpty()
    bairro: string;

    @IsString()
    @IsNotEmpty()
    cidade: string;

    @IsString()
    @IsNotEmpty()
    estado: string;

    @IsString()
    @IsNotEmpty()
    cep: string;
}

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    readonly nome: string;

    @IsString()
    @IsNotEmpty()
    readonly cnpj: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly phone?: string;

    @IsOptional()
    @IsString()
    readonly site?: string;

    @ValidateNested() // Indica validação em objetos aninhados
    @Type(() => AddressDto) // Necessário para instanciar o objeto corretamente
    readonly endereco: AddressDto;
}
