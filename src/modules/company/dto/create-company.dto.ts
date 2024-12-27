import {
    IsString,
    IsOptional,
    ValidateNested,
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    rua: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    numero?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    complemento?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    bairro: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    cidade: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    estado: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(10)
    cep: string;
}

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    readonly nome: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(14)
    @MaxLength(20)
    readonly cnpj: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(20)
    readonly phone?: string;

    @IsOptional()
    @IsString()
    readonly site?: string;

    @ValidateNested() // Indica validação em objetos aninhados
    @Type(() => AddressDto) // Necessário para instanciar o objeto corretamente
    readonly endereco: AddressDto;
}
