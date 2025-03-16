import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { paymentStatus } from 'src/common/enums/paymentStatus';
import { User } from 'src/modules/user/entities/user.entity';

@Table({ tableName: 'payments' })
export class Payment extends Model {
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({
        type: DataType.FLOAT, 
        allowNull: false,
    })
    fee: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    note: string;

    @Column({
        type: DataType.ENUM(...Object.values(paymentStatus)),
        allowNull: false,
        defaultValue: paymentStatus.amount_due,
    })
    status: paymentStatus;

    // Relationship: A payment is made by a patient (patientId is a foreign key)
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    patientId: number;

    @BelongsTo(() => User,{foreignKey:"patientId",as:"patient"})
    patient: User;
}
