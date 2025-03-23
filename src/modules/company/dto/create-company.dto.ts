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
    @ApiProperty({ example: 'Rua dois', description: 'Nome da rua', required: true })
    rua: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    @ApiProperty({ example: '100', description: 'Número da rua', required: false })
    numero?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @ApiProperty({ example: 'Edificion Comercial', description: 'Complemento do endereço', required: false })
    complemento?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({ example: 'Centro', description: 'Bairro', required: true })
    bairro: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({ example: 'Recife', description: 'Cidade', required: true })
    cidade: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    @ApiProperty({ example: 'PE', description: 'Estado', required: true })
    estado: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(10)
    @ApiProperty({ example: '12345-678', description: 'CEP', required: true })
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
    @ApiProperty({ example: 'mazebank@email.com', description: 'CNPJ da empresa', required: true })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(20)
    @ApiProperty({ example: '(55)988888888', description: 'Telefone da empresa', required: true })
    readonly phone?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'www.mazebank.com', description: 'Site da empresa', required: false })
    readonly site?: string;

    @ApiProperty({ type: AddressDto, description: 'Endereço da empresa', required: true })
    @ValidateNested() // Indica validação em objetos aninhados
    @Type(() => AddressDto) // Necessário para instanciar o objeto corretamente
    @ApiProperty({
        type: 'object',
        description: 'Endereço da Empresa',
        properties: {
            rua: { type: 'string', example: 'Rua dois' },
            numero: { type: 'string', example: '100' },
            bairro: { type: 'string', example: 'Centro' },
            cidade: { type: 'string', example: 'Recife' },
            estado: { type: 'string', example: 'PE' },
            cep: { type: 'string', example: '12345-678' },
            complemento: { type: 'string', example: 'Edificion Comercial'},
        },
    })
    readonly endereco: AddressDto;
}
