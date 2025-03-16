import { UserService } from './../user/user.service';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Appointment } from './entites/appointment.entity';
import { createAppointemntDto } from './dto/create-appointment.dto';
import { UserRole } from 'src/common/enums/roles';
import { appointmentStatus } from 'src/common/enums/appointmentStatus';
import { updateAppointemntDto } from './dto/update-appointment';
import { Op, Sequelize } from 'sequelize';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AppointmentService {
    constructor(
        @Inject(repositories.appointment_repository) private appointmentRepo:typeof Appointment,
        private UserService:UserService
    ){}
    
    async create(body:createAppointemntDto)
    {
        const {doctorId,patientId,date} = body
        // check doctor and pateint
        const [doctor,patient] = await Promise.all([
            this.UserService.findUserRole(+doctorId,UserRole.DOCTOR),
            this.UserService.findUserRole(+patientId,UserRole.PATIENT)
        ])
        if(!doctor || !patient)
        {
            throw new NotFoundException('doctor or patient is not in system')
        }

        // check if date is free for doctor and pateint
        const [appointmentForDoctor,appointmentForPateint] = await Promise.all([
            this.findByDate(date,+doctorId),
            this.findByDate(date,+patientId)
        ])
        if(appointmentForDoctor)
        {
            throw new BadRequestException('there is an appointment has the same date for doctor')
        }
        if(appointmentForPateint)
        {
            throw new BadRequestException('there is an appointment has the same date for patient')
        }
        const appointment = await this.appointmentRepo.create({...body})
        await appointment.save()
        return appointment ;
    }

    async changeStatus(id:number,status:appointmentStatus)
    {
        const appointment = await this.findOne(id)
        if(!appointment)
        {
            throw new NotFoundException('appointment is not found')
        }
        appointment.status = status
        await appointment.save()
        return appointment ;
    }

    async updateDate(id:number,body:updateAppointemntDto)
    {
        const {date} = body
        const appointment = await this.findOne(id)
        if(!appointment)
        {
            throw new NotFoundException('appointment is not in the system')
        }
        // check if date is free for doctor and pateint
        const [appointmentForDoctor,appointmentForPateint] = await Promise.all([
            this.findByDate(date,appointment.doctorId),
            this.findByDate(date,appointment.patientId)
        ])
        if(appointmentForDoctor)
        {
            throw new BadRequestException('there is an appointment has the same date for doctor')
        }
        if(appointmentForPateint)
        {
            throw new BadRequestException('there is an appointment has the same date for patient')
        }
        appointment.date = date 
        await appointment.save()
        return appointment
    }

    findAll()
    {
        return this.appointmentRepo.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                        {
                            model: User,
                            attributes: ['username'],
                            as:"doctor"
                        },
                        {
                            model: User,
                            attributes: ['username'],
                            as:"patient"
                        },
                    ],
        })
    }

    async findAllByUser(userId:number)
    {
        const user = await this.UserService.findOne(userId)
        if(!user)
        {
            throw new NotFoundException('user is not found')
        }
        return this.appointmentRepo.findAll({
            where:{
                [Op.or]:[
                    {doctorId: userId},
                    {patientId: userId}
                ]
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                        {
                            model: User,
                            attributes: ['username'],
                            as:"doctor"
                        },
                        {
                            model: User,
                            attributes: ['username'],
                            as:"patient"
                        },
                    ],
        })
    }

    async findDaily() {
        const currentDate = new Date();
        
        // Normalize the date to ignore time part (setting hours, minutes, seconds, and milliseconds to 0)
        const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
    
        return this.appointmentRepo.findAll({
            where: {
                date: {
                    [Op.gte]: startOfDay,
                    [Op.lte]: endOfDay 
                }
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                    as: "doctor"
                },
                {
                    model: User,
                    attributes: ['username'],
                    as: "patient"
                },
            ]
        });
    }

    findOne(id:number)
    {
        return this.appointmentRepo.findByPk(id)
    }

    findByDate(date: Date, userId: number) {
        return this.appointmentRepo.findOne({
            where: {
                [Op.or]:[
                    { date, doctorId: userId },
                    { date, patientId: userId },]
            }
        });
    }
    
    countAppointments()
    {
        return this.appointmentRepo.count()
    }

    async getMonthlyAppointments() {
        const appointmentsByMonth = await this.appointmentRepo.findAll({
            attributes: [
                [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],  // Group by month
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'appointmentsCount'],  // Count appointments
            ],
            group: [Sequelize.fn('MONTH', Sequelize.col('date'))],  // Group by the month of the date
            order: [[Sequelize.fn('MONTH', Sequelize.col('date')), 'ASC']],  // Order by month
            raw: true
        });
        return appointmentsByMonth
    }
}