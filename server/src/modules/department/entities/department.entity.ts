import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table({ tableName: 'departments'})
export class Department extends Model {
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    // Relationship: A department can have many doctors (users with doctor role)
    @HasMany(() => User)
    doctors: User[];
}
