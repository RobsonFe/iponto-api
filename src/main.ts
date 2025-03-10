import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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
}
bootstrap();
