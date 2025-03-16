import { UserService } from 'src/modules/user/user.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Payment } from './entites/payment.entity';
import { createPaymentDto } from './dto/create-payment.dto';
import { UserRole } from 'src/common/enums/roles';
import { updatePaymentDto } from './dto/update-payment.dto';
import { User } from '../user/entities/user.entity';
import { Sequelize } from 'sequelize';

@Injectable()
export class PaymentService {
    constructor(
        @Inject(repositories.payment_repository) private paymentRepo:typeof Payment,
        private UserService:UserService
    ){}

    async create(body:createPaymentDto)
    {
        const {patientId} = body
        const patient = await this.UserService.findUserRole(+patientId,UserRole.PATIENT);
        if(!patient)
        {
            throw new NotFoundException('patient is not found')
        }
        const payment = await this.paymentRepo.create({...body})
        await payment.save()
        return payment ;
    }

    async update(body:updatePaymentDto,id:number)
    {
        const payment = await this.findOne(id)
        if(!payment)
        {
            throw new NotFoundException('the transaction is not found')
        }
        Object.assign(payment,body)
        await payment.save()
        return payment ;
    }

    async delete(id:number)
    {
        const payment = await this.findOne(id)
        if(!payment)
        {
            throw new NotFoundException('the transaction is not found')
        }
        await payment.destroy()
        return true ;
    }

    findAll()
    {
        return this.paymentRepo.findAll({
            attributes: { exclude: ['updatedAt'] },
            include: [
                        {
                            model: User,
                            attributes: ['username'],
                            as:"patient"
                    },
            ],
        })
    }

    async findByPateint(patientId:number)
    {
        const patient = await this.UserService.findUserRole(+patientId,UserRole.PATIENT);
        if(!patient)
        {
            throw new NotFoundException('patient is not found')
        }
        return this.paymentRepo.findAll({where:{patientId}})
    }
    
    async findRecently() {
        return this.paymentRepo.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            attributes: { exclude: ['updatedAt'] },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                    as: "patient"
                }
            ],
        });
    }

    findOne(id:number)
    {
        return this.paymentRepo.findByPk(id)
    }

    countPayments()
    {
        return this.paymentRepo.count()
    }

    async getMontlyPayments()
    {
        const revenueByMonth = await this.paymentRepo.findAll({
            attributes: [
                [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],  // Group by month
                [Sequelize.fn('SUM', Sequelize.col('fee')), 'totalRevenue'],  // Sum the fees for revenue
            ],
            group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],  // Group by month of payment
            order: [[Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'ASC']],  // Order by month
            raw:true
        });
        return revenueByMonth
    }
}
