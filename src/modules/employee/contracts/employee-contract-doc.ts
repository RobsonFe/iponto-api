import { ApiBody, ApiForbiddenResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

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
        ApiBody({ type: CreateEmployeeDto }),
        ApiResponse({
            status: 201,
            description: 'Funcionário atualizado com sucesso.',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    nome: { type: 'string', example: 'Kazuma Kuwabara' },
                    email: { type: 'string', example: 'kazuma@email.com' },
                    cpf: { type: 'string', example: '123.456.789-00' },
                    phone: { type: 'string', example: '(11) 99999-9999' },
                    linkedin: { type: 'string', example: 'linkedin.com/kazuma' },
                    companyId: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    endereco: { type: 'object', properties: {
                        rua: { type: 'string', example: 'Rua um' },
                        numero: { type: 'string', example: '123' },
                        bairro: { type: 'string', example: 'Centro' },
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
        ApiBody({ type: CreateEmployeeDto }),
        ApiResponse({
            status: 200,
            description: 'Funcionário atualizado com sucesso.',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    nome: { type: 'string', example: 'Kazuma Kuwabara' },
                    email: { type: 'string', example: 'kazuma@email.com' },
                    cpf: { type: 'string', example: '123.456.789-00' },
                    phone: { type: 'string', example: '(11) 99999-9999' },
                    linkedin: { type: 'string', example: 'linkedin.com/kazuma' },
                    companyId: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    endereco: { type: 'object', properties: {
                        rua: { type: 'string', example: 'Rua um' },
                        numero: { type: 'string', example: '123' },
                        bairro: { type: 'string', example: 'Centro' },
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

export function FindAllEmployeesDoc(){
    return applyDecorators(
        ApiOperation({
            summary: 'Listagem de funcionários',
            description: 'Lista todos os funcionários existentes no sistema.',
        }),
        ApiResponse({
            status: 200,
            description: 'Funcionários encontrados com sucesso.',
            example:[
                {
                  "id": "142530d8-1c0e-43ba-ae35-e25f1fc3109c",
                  "nome": "Yusuke Urameshi",
                  "cpf": "123.456.789-00",
                  "email": "yusuke@email.com",
                  "phone": "(11) 99999-9999",
                  "linkedin": "linkedin.com/yusuke",
                  "endereco": {
                    "rua": "Rua um",
                    "numero": "69",
                    "bairro": "Centro",
                    "cidade": "Recife",
                    "estado": "PE",
                    "cep": "12345-678",
                    "complemento": "Apartamento 69"
                  },
                  "createdAt": "2025-03-22T04:09:24.094Z",
                  "updatedAt": "2025-03-22T04:12:41.559Z"
                },
                {
                    "id": "142530d8-1c0e-43ba-ae35-e25f1fc3109c",
                    "nome": "Hiei Jaganshi",
                    "cpf": "123.456.789-00",
                    "email": "hiei@ghost.com",
                    "phone": "(11) 99999-9999",
                    "linkedin": "linkedin.com/hiei",
                    "endereco": {
                      "rua": "Rua um",
                      "numero": "69",
                      "bairro": "Centro",
                      "cidade": "Recife",
                      "estado": "PE",
                      "cep": "12345-678",
                      "complemento": "Apartamento 69"
                    },
                    "createdAt": "2025-03-22T04:09:24.094Z",
                    "updatedAt": "2025-03-22T04:12:41.559Z"
                  },
                  {
                    "id": "142530d8-1c0e-43ba-ae35-e25f1fc3109c",
                    "nome": "Kurama Minamino",
                    "cpf": "123.456.789-00",
                    "email": "kurama@email.com",
                    "phone": "(11) 99999-9999",
                    "linkedin": "linkedin.com/kurama",
                    "endereco": {
                      "rua": "Rua um",
                      "numero": "69",
                      "bairro": "Centro",
                      "cidade": "Recife",
                      "estado": "PE",
                      "cep": "12345-678",
                      "complemento": "Apartamento 69"
                    },
                    "createdAt": "2025-03-22T04:09:24.094Z",
                    "updatedAt": "2025-03-22T04:12:41.559Z"
                  }
              ]
        }),
        ApiResponse({ status: 404, description: 'Funcionários não encontrados.' }),
        ApiResponse({ status: 500, description: 'Erro no servidor.' }),
    );
}

export function FindEmployeeByIdDoc(){
    return applyDecorators(
        ApiOperation({
            summary: 'Busca de funcionário',
            description: 'Busca um funcionário existente no sistema.',
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
       ApiResponse({
            status: 200,
            description: 'Funcionário encontrado com sucesso.',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    nome: { type: 'string', example: 'Kazuma Kuwabara' },
                    email: { type: 'string', example: 'kazuma@email.com' },
                    cpf: { type: 'string', example: '123.456.789-00' },
                    phone: { type: 'string', example: '(11) 99999-9999' },
                    linkedin: { type: 'string', example: 'linkedin.com/kazuma' },
                    companyId: { type: 'string', example: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98' },
                    endereco: { type: 'object', properties: {
                        rua: { type: 'string', example: 'Rua um' },
                        numero: { type: 'string', example: '123' },
                        bairro: { type: 'string', example: 'Centro' },
                        cidade: { type: 'string', example: 'Recife' },
                        estado: { type: 'string', example: 'PE' },
                        cep: { type: 'string', example: '12345-678' },
                        complemento: { type: 'string', example: 'Apartamento 69' },
                    }},
                    createdAt: { type: 'string', example: '2021-08-18T00:00:00.000Z' },
                    updatedAt: { type: 'string', example: '2021-08-18T00:00:00.000Z' }
                },
            },  
       }),
       ApiResponse({ status: 404, description: 'Empresa não encontrada.' }),
       ApiResponse({ status: 500, description: 'Erro no servidor.' }),
    );
}

export function CountEmployeesDoc() {
    return applyDecorators(
      ApiOperation({ summary: 'Contagem de funcionários cadastrados.' }),
      ApiResponse({ 
          status: 200, 
          description: 'Retorna a contagem de funcionários no sistema',
          example: 10,
      }),
      ApiResponse({ status: 400, description: 'Erro de requisição.' }),
      ApiResponse({ status: 500, description: 'Erro no servidor.' }),
    );
  }

  export function DeleteEmployeeDoc() {
    return applyDecorators(
      ApiParam({ name: 'id', description: 'ID do funcionário a ser deletado.', required: true }),
      ApiOperation({ summary: 'Deletar um funcionário.' }), 
      ApiResponse({ status: 204, description: 'Funcionário Deletado com sucesso.' }),
      ApiResponse({ status: 404, description: 'Funcionário não encontrado.' }),
      ApiResponse({ status: 500, description: 'Erro no servidor.' }),
    );
  }
