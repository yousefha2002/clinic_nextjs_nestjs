import { repositories } from 'src/common/enums/repositories';
import { Appointment } from './entites/appointment.entity';

export const AppointmentProvider = [
    {
        provide: repositories.appointment_repository,
        useValue: Appointment,
    },
];
