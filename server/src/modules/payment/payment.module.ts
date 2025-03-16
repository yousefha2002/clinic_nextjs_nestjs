import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentProvider } from './payment.repository';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService,...PaymentProvider],
  imports:[UserModule],
  exports:[PaymentService]
})
export class PaymentModule {}
