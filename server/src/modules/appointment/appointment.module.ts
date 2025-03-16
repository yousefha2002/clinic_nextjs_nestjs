import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentProvider } from './appointment.repository';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService,...AppointmentProvider],
  imports:[UserModule],
  exports:[AppointmentService]
})
export class AppointmentModule {}
