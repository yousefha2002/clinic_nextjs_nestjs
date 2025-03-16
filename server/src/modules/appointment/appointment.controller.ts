import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { createAppointemntDto } from './dto/create-appointment.dto';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { appointmentDto } from './dto/appointment.dto';
import { appointmentStatus } from 'src/common/enums/appointmentStatus';
import { updateAppointemntDto } from './dto/update-appointment';
import { Roles } from 'src/decorators/role.decorator';
import { UserRole } from 'src/common/enums/roles';
import { UserGuard } from 'src/guards/user.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Serilaize(appointmentDto)
  @Post('create')
  @UseGuards(AdminGuard)
  ceateAppointment(@Body() body:createAppointemntDto)
  {
    return this.appointmentService.create(body)
  }

  @Serilaize(appointmentDto)
  @Patch('cancel/:id')
  @UseGuards(AdminGuard)
  cancelAppointment(@Param('id') id:string) 
  {
    console.log(id)
    return this.appointmentService.changeStatus(+id,appointmentStatus.canceled)
  }

  @Serilaize(appointmentDto)
  @Patch('complete/:id')
  @UseGuards(AdminGuard)
  completeAppointment(@Param('id') id:string) 
  {
    return this.appointmentService.changeStatus(+id,appointmentStatus.completed)
  }

  @Serilaize(appointmentDto)
  @Patch(':id')
  @UseGuards(AdminGuard)
  updateAppointmentDate(@Param('id') id:string,@Body() body:updateAppointemntDto) 
  {
    return this.appointmentService.updateDate(+id,body)
  }

  @Get()
  getAppointments()
  {
    return this.appointmentService.findAll()
  }

  @Get('daily')
  getDailyAppointments()
  {
    return this.appointmentService.findDaily()
  }

  @Get(':id')
  async getAppointemnt(@Param('id') id:string)
  {
    const appointment = await this.appointmentService.findOne(+id)
    if(!appointment)
    {
      throw new NotFoundException('appointment is not found')
    }
    return appointment
  }

  @Get('all/mine')
  @Roles(UserRole.DOCTOR,UserRole.PATIENT)
  @UseGuards(UserGuard)
  getUserAppointments(@CurrentUser() user:User)
  {
    return this.appointmentService.findAllByUser(+user.id)
  }

  @Get('all/:id')
  getAppointmentsByUser(@Param('id') id:string)
  {
    return this.appointmentService.findAllByUser(+id)
  }
}
