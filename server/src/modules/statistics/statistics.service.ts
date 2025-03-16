import { PaymentService } from './../payment/payment.service';
import { AppointmentService } from './../appointment/appointment.service';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
    constructor(
        private UserService:UserService,
        private AppointmentService:AppointmentService,
        private PaymentService:PaymentService
    ){}
    async findForAdmin()
    {
        const [doctors,patients,appointments,payments] = await Promise.all([
            this.UserService.countDoctors(),
            this.UserService.countPatients(),
            this.AppointmentService.countAppointments(),
            this.PaymentService.countPayments()
        ])
        return {doctors,patients,appointments,payments}
    }

    async findMonthlyStatisicts() {
        const [appointments, revenue] = await Promise.all([
            this.AppointmentService.getMonthlyAppointments(),
            this.PaymentService.getMontlyPayments()
        ]);
    
        const monthlyStats = (appointments as unknown as Array<{ month: number, appointmentsCount: number }>).map((appointment) => {
            const month = appointment.month;
            const revenueForMonth = (revenue as unknown as Array<{ month: number, totalRevenue: number }>).find((payment) => payment.month === month);
            
            return {
                month,
                appointmentsCount: appointment.appointmentsCount,
                revenue: revenueForMonth ? revenueForMonth.totalRevenue : 0, // If no revenue, default to 0
            };
        });
    
        return monthlyStats;
    }
}
