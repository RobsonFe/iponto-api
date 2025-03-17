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
import { ApiProperty } from '@nestjs/swagger';

class AddressDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    @ApiProperty({ example: 'Rua um', description: 'Rua do Prédio', required: true })
    rua: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    @ApiProperty({ example: '666', description: 'Numero do prédio', required: false })
    numero?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @ApiProperty({ example: 'Perto da Star Junction', description: 'Complemento do endereço', required: false })
    complemento?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({ example: 'Algonquin', description: 'Bairro onde reside a empresa',  required: true })
    bairro: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({ example: 'Liberty City', description: 'Cidade onde reside a empresa', required: true })
    cidade: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    @ApiProperty({ example: 'Liberty State', description: 'Estado onde reside a empresa', required: true })
    estado: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(10)
    @ApiProperty({ example: '0000000', description: 'CEP da empresa', required: true })
    cep: string;
}

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Maze Bank', description: 'Nome da empresa', required: true })
    readonly nome: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(14)
    @MaxLength(20)
    @ApiProperty({ example: '16.365.666/0001-88', description: 'CNPJ da empresa', required: true })
    readonly cnpj: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: '16.365.666/0001-88', description: 'CNPJ da empresa', required: true })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(20)
    @ApiProperty({ example: '55988888888', description: 'Telefone da empresa', required: true })
    readonly phone?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'www.mazebank.com', description: 'Site da empresa', required: false })
    readonly site?: string;

    @ApiProperty({ type: AddressDto, description: 'Endereço da empresa', required: true })
    @ValidateNested() // Indica validação em objetos aninhados
    @Type(() => AddressDto) // Necessário para instanciar o objeto corretamente
    readonly endereco: AddressDto;
}
