import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { createPaymentDto } from './dto/create-payment.dto';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { PaymentDto } from './dto/payment.dto';
import { updatePaymentDto } from './dto/update-payment.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';
import { UserGuard } from 'src/guards/user.guard';
import { Roles } from 'src/decorators/role.decorator';
import { UserRole } from 'src/common/enums/roles';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Serilaize(PaymentDto)
  @Post()
  @UseGuards(AdminGuard)
  addPayment(@Body() body:createPaymentDto)
  {
    return this.paymentService.create(body)
  }

  @Serilaize(PaymentDto)
  @Patch(":id")
  @UseGuards(AdminGuard)
  updatePayment(@Body() body:updatePaymentDto,@Param('id') id:string)
  {
    return this.paymentService.update(body,+id)
  }

  @Delete(":id")
  @UseGuards(AdminGuard)
  DeletePayment(@Param('id') id:string)
  {
    return this.paymentService.delete(+id)
  }

  @Get()
  getPayments()
  {
    return this.paymentService.findAll()
  }

  @Get('recently')
  getRecentlyPayments()
  {
    return this.paymentService.findRecently()
  }

  @Serilaize(PaymentDto)
  @Get('/:id')
  async getPayment(@Param('id') id:string)
  {
    const payment = await this.paymentService.findOne(+id)
    if(!payment)
    {
      throw new NotFoundException('payment is not found')
    }
    return payment
  }

  @UseGuards(UserGuard)
  @Roles(UserRole.PATIENT)
  @Get('all/mine')
  getUserPayments(@CurrentUser() user:User)
  {
    return this.paymentService.findByPateint(+user.id)
  }

  @Get('all/:patientId')
  getPaymentsByUser(@Param('patientId') patientId:string)
  {
    return this.paymentService.findByPateint(+patientId)
  }
}
