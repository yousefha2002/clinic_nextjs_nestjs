import { Sequelize } from 'sequelize-typescript';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { Appointment } from 'src/modules/appointment/entites/appointment.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Payment } from 'src/modules/payment/entites/payment.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
        const sequelize = new Sequelize({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '2838293yo',
            database: 'clinic_db',
        });
        sequelize.addModels([User,Department,Payment,Appointment,Admin]);
        await sequelize.sync({ alter: false });
        return sequelize;
        },
    },
];