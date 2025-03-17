import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiForbiddenResponse, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

export function CompanyContractApi() {
  return applyDecorators(
    ApiTags('Company'),
    ApiHeader({
        name: 'Empresa',
        description: 'Endpoints para manipulação de dados das empresas cadastradas no sistema.',
    }),
    ApiForbiddenResponse({ description: 'Acesso negado.' }),
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
      ApiResponse({ status: 500, description: 'Erro no servidor.' }),
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
    ApiTags('Company'),
    ApiHeader({
        name: 'Atualizar Empresa',
        description: 'Atualizar dados de uma empresa no sistema, persistindo no banco de dados.',
    }),
    ApiParam({ name: 'id', description: 'Identificador único da empresa', required: true }),
    ApiBody({
        schema:{
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
        },
    }),
    ApiOperation({ summary: 'Atualizar dados da empresa.' }),
    ApiResponse({ 
        status: 200, 
        description: 'Empresa Atualizada com sucesso!',
        example:{
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
     }),
    ApiResponse({ status: 404, description: 'Empresa não encontrada.' }),
    ApiResponse({ status: 400, description: 'Erro de validação' }),
    ApiResponse({ status: 500, description: 'Erro no servidor' }),
    HttpCode(HttpStatus.OK),
  );
}

export function FindCompanyByIdDoc() {
  return applyDecorators(
    ApiTags('Company'),
    ApiParam({ name: 'id', description: 'ID da Empresa a ser encontrada.', required: true }),
    ApiOperation({ summary: 'Encontre uma empresa pelo ID.' }),
    ApiResponse({ 
        status: 200, description: 'Retorna a empresa buscada.' ,
        example:{
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
    }),
    ApiResponse({ status: 404, description: 'Empresa não encontrada.' }),
    ApiResponse({ status: 500, description: 'Erro no servidor.' }),
    HttpCode(HttpStatus.OK)
  );
}

export function CountCompaniesDoc() {
  return applyDecorators(
    ApiTags('Company'),
    ApiHeader({
        name: 'Contagem de Empresas',
        description: 'Contagem de empresas cadastradas no sistema, esse dados são importantes para estatísticas e relatórios.',
    }),
    ApiOperation({ summary: 'Contagem de empresas cadastradas.' }),
    ApiResponse({ 
        status: 200, 
        description: 'Retorna a contagem de empresas no sistema',
        example: 10,
    }),
    ApiResponse({ status: 400, description: 'Erro de requisição.' }),
    ApiResponse({ status: 500, description: 'Erro no servidor.' }),
    HttpCode(HttpStatus.OK),
  );
}

export function DeleteCompanyDoc() {
  return applyDecorators(
    ApiTags('Company'),
    ApiParam({ name: 'id', description: 'ID da Empresa a ser deletada.', required: true }),
    ApiHeader({
        name: 'Deletar Empresa',
        description: 'Deletar uma empresa do sistema, removendo do banco de dados.',
    }),
    ApiOperation({ summary: 'Deletar uma empresa.' }), 
    ApiResponse({ status: 204, description: 'Empresa Deletada com sucesso.' }),
    ApiResponse({ status: 404, description: 'Empresa não encontrada.' }),
    ApiResponse({ status: 500, description: 'Erro no servidor.' }),
    HttpCode(HttpStatus.NO_CONTENT),
  );
}
