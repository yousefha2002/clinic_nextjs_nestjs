import { Column, Model, Table, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { UserRole } from 'src/common/enums/roles';
import { Appointment } from 'src/modules/appointment/entites/appointment.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Payment } from 'src/modules/payment/entites/payment.entity';

@Table({ tableName: 'users' })
export class User extends Model {
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING })
    username: string;

    @Column({ 
        type: DataType.STRING,
        defaultValue:"https://cdn-icons-png.flaticon.com/512/149/149071.png" })
    image: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    birthdate: string;

    @Column({
        type: DataType.ENUM,
        values: Object.values(UserRole),
        allowNull: false
    })
    role: UserRole;

    // Relationship: A doctor has one department
    @ForeignKey(() => Department)
    @Column({ type: DataType.INTEGER, allowNull: true })
    departmentId: number;

    @BelongsTo(() => Department)
    department: Department;

    // Relationship: A doctor can have many appointments (doctorId in Appointment)
    @HasMany(() => Appointment, 'doctorId')
    doctorAppointments: Appointment[];

    // Relationship: A patient can have many appointments (patientId in Appointment)
    @HasMany(() => Appointment, 'patientId')
    patientAppointments: Appointment[];

    // Relationship: A patient can have many payments
    @HasMany(() => Payment, 'patientId')
    payments: Payment[];
}
