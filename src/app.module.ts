import { CompanyModule } from './modules/company/company.module';
import { CompanyService } from './modules/company/service/company.service';
import { CompanyController } from './modules/company/controller/company.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [CompanyModule],
    controllers: [CompanyController, AppController],
    providers: [CompanyService, AppService],
})
export class AppModule {}
