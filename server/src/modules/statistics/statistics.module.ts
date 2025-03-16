import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { UserModule } from '../user/user.module';
import { AppointmentModule } from '../appointment/appointment.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports:[UserModule,AppointmentModule,PaymentModule]
})
export class StatisticsModule {}
