import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { appointmentStatus } from 'src/common/enums/appointmentStatus';
import { User } from 'src/modules/user/entities/user.entity';

@Table({ tableName: 'appointments' })
export class Appointment extends Model {
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({
        type: DataType.DATE, 
        allowNull: false,
    })
    date: Date;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    note: string;

    @Column({
        type: DataType.ENUM(...Object.values(appointmentStatus)),
        allowNull: false,
        defaultValue: appointmentStatus.pending,
    })
    status: appointmentStatus;

    // Relationship: An appointment belongs to one doctor (doctorId is a foreign key)
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    doctorId: number;

    @BelongsTo(() => User,{foreignKey:"doctorId",as:"doctor"})
    doctor: User;

    // Relationship: An appointment belongs to one patient (patientId is a foreign key)
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    patientId: number;

    @BelongsTo(() => User,{foreignKey:"patientId",as:"patient"})
    patient: User;
}
