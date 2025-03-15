import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.setGlobalPrefix('api/v1', {
        exclude: ['/'],
    });

    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    const config = new DocumentBuilder()
        .setTitle('Iponto API')
        .setDescription('API para controle de ponto eletrônico e gerencimento de funcionários')
        .setContact('Robson Ferreira da Silva', 'https://github.com/RobsonFe', 'robsonfe.dev@gmail.com') 
        .setLicense('MIT', 'https://mit-license.org/')
        .setTermsOfService('https://www.termsfeed.com/live/38226a32-d1fb-4783-8925-ad4706359984')
        .setExternalDoc('Documentação da API com todas as fases e especificações do projeto.', 'https://docs.google.com/document/d/1ZEBIqUWARSRgf9nwzdOd5fPf2UZD_VuFm8nMKpzmBAw/edit?usp=sharing')
        .setVersion('1.0')
        .addTag('API')
        .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('doc', app, document);
    
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // remove propriedades que não estão no DTO
            transform: true, // transforma os tipos das propriedades para os tipos definidos no DTO
            forbidNonWhitelisted: true, // retorna erro caso exista propriedades não definidas no DTO
            transformOptions: {
                enableImplicitConversion: true,
            }, // transforma os tipos das propriedades para os tipos definidos no DTO
        }),
    );
    
    await app.listen(8080);

    console.log(`Aplicação rodando na porta: ${await app.getUrl()}`);
    console.log(`Documentação disponível em: ${await app.getUrl()}/doc`);
}
bootstrap();
