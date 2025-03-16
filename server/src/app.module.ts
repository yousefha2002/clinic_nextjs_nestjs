import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { DepartmentModule } from './modules/department/department.module';
import { AdminModule } from './modules/admin/admin.module';
import { PaymentModule } from './modules/payment/payment.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { JwtModule } from '@nestjs/jwt';
import { StatisticsModule } from './modules/statistics/statistics.module';

@Module({
    imports: [
        JwtModule.register({ global: true, secret: 'token' }),
        DatabaseModule,
        UserModule,
        DepartmentModule,
        AdminModule,
        PaymentModule,
        AppointmentModule,
        StatisticsModule,
    ]
})
export class AppModule {}