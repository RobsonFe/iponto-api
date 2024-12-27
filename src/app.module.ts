import { EmployeeModule } from './modules/employee/module/employee.module';
import { CompanyModule } from './modules/company/module/company.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [EmployeeModule, CompanyModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
