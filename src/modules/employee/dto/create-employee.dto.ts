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

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Kazuma Kuwabara', description: 'Nome do funcionário' })
    readonly nome: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'kazuma@email.com', description: 'Email do funcionário' })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(20)
    @ApiProperty({ example: '123.456.789-00', description: 'CPF do funcionário' })
    readonly cpf: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(20)
    @ApiProperty({ example: '(11) 99999-9999', description: 'Telefone do funcionário' })
    readonly phone: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'linkedin.com/kazuma', description: 'Perfil do LinkedIn', required: false })
    readonly linkedin?: string;

    @ValidateNested()
    @Type(() => AddressDto)
    @ApiProperty({
        type: 'object',
        description: 'Endereço do funcionário',
        properties: {
            rua: { type: 'string', example: 'Rua um' },
            numero: { type: 'string', example: '123' },
            bairro: { type: 'string', example: 'Centro' },
            cidade: { type: 'string', example: 'Recife' },
            estado: { type: 'string', example: 'PE' },
            cep: { type: 'string', example: '12345-678' },
            complemento: { type: 'string', example: 'Apartamento 69'},
        },
    })
    readonly endereco: AddressDto;

    @IsNotEmpty()
    @IsString()
    companyId: string;
}
