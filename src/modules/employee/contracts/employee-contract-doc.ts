import { ApiBody, ApiForbiddenResponse, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function EmployeeContractApi() {
    return applyDecorators(
        ApiTags('Employee'),
    )
}
export function CreateEmployeeDoc() {
    return applyDecorators(
        ApiOperation({
            summary: 'Criação de funcionário',
            description: 'Cria um novo funcionário no sistema.',
        }),
        ApiBody({
            description: 'Dados do funcionário',
            type: 'object',
            schema: {
                type: 'object',
                properties: {
                    nome: { type: 'string', example: 'Kazuma Kuwabara' },
                    email: { type: 'string', example: 'Kazuma@ghost.com'},
                    cpf: { type: 'string', example: '123.456.789-00'},
                    phone: { type: 'string', example: '(11) 99999-9999'},
                    linkedin: { type: 'string', example: 'linkedin.com/kazuma'},
                    companyId: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    endereco: { type: 'object', properties: {
                        rua: { type: 'string', example: 'Rua um'},
                        numero: { type: 'string', example: '69'},
                        bairro: { type: 'string', example: 'Vila do Chaves'},
                        cidade: { type: 'string', example: 'Recife'},
                        estado: { type: 'string', example: 'PE'},
                        cep: { type: 'string', example: '12345-678'},
                        complemento: { type: 'string', example: 'Apartamento 69'},
                    }}
                },
                required: ['name', 'email', 'cpf', 'phone', 'companyId', 'endereco'],
            },
        }),
        ApiResponse({
            status: 201,
            description: 'Funcionário criado com sucesso.',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    nome: { type: 'string', example: 'Kazuma Kuwabara' },
                    email: { type: 'string', example: '' },
                    cpf: { type: 'string', example: '123.456.789-00' },
                    phone: { type: 'string', example: '(11) 99999-9999' },
                    linkedin: { type: 'string', example: 'linkedin.com/kazuma' },
                    companyId: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    endereco: { type: 'object', properties: {
                        rua: { type: 'string', example: 'Rua um' },
                        numero: { type: 'string', example: '69' },
                        bairro: { type: 'string', example: 'Vila do Chaves' },
                        cidade: { type: 'string', example: 'Recife' },
                        estado: { type: 'string', example: 'PE' },
                        cep: { type: 'string', example: '12345-678' },
                        complemento: { type: 'string', example: 'Apartamento 69' },
                    }}
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Erro de validação',
            schema: {
              example: {
                statusCode: 400,
                message: ['Os campos nome, cpf , email, phone, endereco são obrigatórios.'],
                error: 'Bad Request',
              },
            },
          }),
          ApiResponse({
            status: 409,
            description: 'Funcionário já cadastrado',
            schema: {
              example: {
                statusCode: 409,
                message: 'Funcionário já cadastrado.',
                error: 'Conflict',
              },
            },
          }),
            ApiResponse({
                status: 500,
                description: 'Erro no servidor',
                schema: {
                example: {
                    statusCode: 500,
                    message: 'Internal server error',
                    error: 'Internal Server Error',
                },
                },
            }),
        ApiForbiddenResponse({ description: 'Erro no servidor.' }),
    )
}

export function UpdateEmployeeDoc(){
    return applyDecorators(
        ApiOperation({
            summary: 'Atualização de funcionário',
            description: 'Atualiza um funcionário existente no sistema.',
        }),
        ApiParam({
            name: 'id',
            description: 'Identificador do funcionário',
            required: true,
            schema: {
                type: 'string',
                example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98',
            },
        }),
        ApiBody({
            description: 'Dados do funcionário',
            type: 'object',
            schema: {
                type: 'object',
                properties: {
                    nome: { type: 'string', example: 'Kazuma Kuwabara' },
                    email: { type: 'string', example: 'kazuma@ghost.com' },
                    cpf: { type: 'string', example: '123.456.789-00' },
                    phone: { type: 'string', example: '(11) 99999-9999' },
                    linkedin: { type: 'string', example: 'linkedin.com/kazuma' },
                    companyId: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    endereco: { type: 'object', properties: {
                        rua: { type: 'string', example: 'Rua um' },
                        numero: { type: 'string', example: '69' },
                        bairro: { type: 'string', example: 'Vila do Chaves' },
                        cidade: { type: 'string', example: 'Recife' },
                        estado: { type: 'string', example: 'PE' },
                        cep: { type: 'string', example: '12345-678' },
                        complemento: { type: 'string', example: 'Apartamento 69' },
                    }}
                },
            },
        }),
        ApiResponse({
            status: 200,
            description: 'Funcionário atualizado com sucesso.',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    nome: { type: 'string', example: 'Kazuma Kuwabara' },
                    email: { type: 'string', example: 'kazuma@ghost.com' },
                    cpf: { type: 'string', example: '123.456.789-00' },
                    phone: { type: 'string', example: '(11) 99999-9999' },
                    linkedin: { type: 'string', example: 'linkedin.com/kazuma' },
                    companyId: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    endereco: { type: 'object', properties: {
                        rua: { type: 'string', example: 'Rua um' },
                        numero: { type: 'string', example: '69' },
                        bairro: { type: 'string', example: 'Vila do Chaves' },
                        cidade: { type: 'string', example: 'Recife' },
                        estado: { type: 'string', example: 'PE' },
                        cep: { type: 'string', example: '12345-678' },
                        complemento: { type: 'string', example: 'Apartamento 69' },
                    }}
                },
            },
        }),
          ApiResponse({
            status: 409,
            description: 'Funcionário já cadastrado',
            schema: {
              example: {
                statusCode: 409,
                message: 'Funcionário já cadastrado.',
                error: 'Conflict',
              },
            },
          }),
            ApiResponse({
                status: 500,
                description: 'Erro no servidor',
                schema: {
                example: {
                    statusCode: 500,
                    message: 'Internal server error',
                    error: 'Internal Server Error',
                },
                },
            }),
        ApiForbiddenResponse({ description: 'Erro no servidor.' }),
    )
}
