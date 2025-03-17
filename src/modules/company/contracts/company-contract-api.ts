import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiForbiddenResponse, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Param } from '@nestjs/common';
import { CompanyEntity } from 'src/modules/entities/company.entity';

export function CompanyContractApi() {
  return applyDecorators(
    ApiTags('Company'),
  );
}

export function CreateCompanyDoc() {
    return applyDecorators(
      ApiHeader({
        name: 'Registro de Empresa',
        description: 'Registro de uma nova empresa no sistema, persistindo no banco de dados',
      }),
      ApiTags('Company'),
      ApiOperation({ summary: 'Registra uma empresa no sistema.' }),
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            nome: { type: 'string', example: 'Maze Bank' },
            cnpj: { type: 'string', example: '16.365.666/0001-88' },
            email: { type: 'string', example: 'mazebank@email.com' },
            phone: { type: 'string', example: '5581988881111' },
            site: { type: 'string', example: 'www.mazebank.com' },
            endereco: {
              type: 'object',
              properties: {
                rua: { type: 'string', example: 'Liberty City Avenue' },
                numero: { type: 'string', example: '123' },
                bairro: { type: 'string', example: 'Algonquin' },
                cidade: { type: 'string', example: 'Liberty City' },
                estado: { type: 'string', example: 'Liberty State' },
                cep: { type: 'string', example: '00000-000' },
              },
            },
          },
          required: ['nome', 'cnpj', 'email', 'phone', 'endereco'],
        },
      }),
      ApiResponse({
        status: 201,
        description: 'Empresa Registrada com sucesso!',
        content: {
          'application/json': {
            example: {
              nome: 'Maze Bank',
              cnpj: '16.365.666/0001-88',
              email: 'mazebank@email.com',
              phone: '5581988881111',
              site: 'www.mazebank.com',
              endereco: {
                rua: 'Liberty City Avenue',
                numero: '123',
                bairro: 'Algonquin',
                cidade: 'Liberty City',
                estado: 'Liberty State',
                cep: '00000-000',
              },
              id: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98',
              createdAt: '2021-08-18T00:00:00.000Z',
              updatedAt: '2021-08-18T00:00:00.000Z',
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Erro de validação',
        schema: {
          example: {
            statusCode: 400,
            message: ['Os campos nome, cnpj , email, phone, endereco são obrigatórios.'],
            error: 'Bad Request',
          },
        },
      }),
      ApiForbiddenResponse({ description: 'Erro no registro' }),
      HttpCode(HttpStatus.CREATED),
    );
  }
  

export function FindAllCompaniesDoc() {
  return applyDecorators(
    ApiTags('Company'),
    ApiHeader({
        name: 'Listar Empresas',
        description: 'Listar todas as empresas cadastradas no sistema, retornando uma lista de empresas com todos os dados.',
    }),
    ApiOperation({
         summary: 'Listar todas as empresas cadastradas no sistema',
         description: 'Listar todas as empresas cadastradas no sistema, retornando uma lista de empresas com todos os dados.', 
        }),
    ApiQuery({
        name: 'page',
        description: 'Número da página para paginação',
        required: false,
        type: Number,
        }),
        ApiQuery({
        name: 'limit',
        description: 'Quantidade de itens por página',
        required: false,
        type: Number,
        }),
    ApiResponse({ 
        status: 200, description: 'Retorna uma lista de empresas em um array',
        example:[
            {
                nome: 'Maze Bank',
                cnpj: '16.365.666/0001-88',
                email: 'mazebank@email.com',
                phone: '5581988881111',
                site: 'www.mazebank.com',
                endereco: {
                  rua: 'Liberty City Avenue',
                  numero: '123',
                  bairro: 'Algonquin',
                  cidade: 'Liberty City',
                  estado: 'Liberty State',
                  cep: '00000-000',
                },
                id: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98',
                createdAt: '2021-08-18T00:00:00.000Z',
                updatedAt: '2021-08-18T00:00:00.000Z',
            },
            {
                nome: 'Maze Bank',
                cnpj: '16.365.666/0001-88',
                email: 'mazebank@email.com',
                phone: '5581988881111',
                site: 'www.mazebank.com',
                endereco: {
                  rua: 'Liberty City Avenue',
                  numero: '123',
                  bairro: 'Algonquin',
                  cidade: 'Liberty City',
                  estado: 'Liberty State',
                  cep: '00000-000',
                },
                id: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98',
                createdAt: '2021-08-18T00:00:00.000Z',
                updatedAt: '2021-08-18T00:00:00.000Z',
            },
            {
                nome: 'Maze Bank',
                cnpj: '16.365.666/0001-88',
                email: 'mazebank@email.com',
                phone: '5581988881111',
                site: 'www.mazebank.com',
                endereco: {
                  rua: 'Liberty City Avenue',
                  numero: '123',
                  bairro: 'Algonquin',
                  cidade: 'Liberty City',
                  estado: 'Liberty State',
                  cep: '00000-000',
                },
                id: 'fa3b71ab-6b6b-5067-a9df-2f9d4a25cf98',
                createdAt: '2021-08-18T00:00:00.000Z',
                updatedAt: '2021-08-18T00:00:00.000Z',
            }
        ] 
    }),
    ApiResponse({
        status: 404,
        description: 'Nenhuma empresa encontrada',
        schema: {
            example: {
                statusCode: 404,
                message: 'Nenhuma empresa encontrada',
                error: 'Not Found',
            },
        },
    }),
    ApiResponse({
        status: 500,
        description: 'Erro no servidor',
        schema: {
            example: {
                statusCode: 500,
                message: 'Erro de erro no servidor',
                error: 'Bad Request',
            },
        },
    }),
    HttpCode(HttpStatus.OK),
  );
}

export function UpdateCompanyDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a company' }),
    ApiResponse({ status: 200, description: 'Company updated successfully' }),
    ApiResponse({ status: 404, description: 'Company not found' }),
  );
}

export function FindCompanyByIdDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Find a company by id' }),
    ApiResponse({ status: 200, description: 'Return a company' }),
    ApiResponse({ status: 404, description: 'Company not found' }),
  );
}

export function CountCompaniesDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Count all companies' }),
    ApiResponse({ status: 200, description: 'Return the total of companies' }),
  );
}

export function DeleteCompanyDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a company' }),
    ApiResponse({ status: 200, description: 'Company deleted successfully' }),
    ApiResponse({ status: 404, description: 'Company not found' }),
  );
}
