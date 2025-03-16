import { repositories } from 'src/common/enums/repositories';
import { Payment } from './entites/payment.entity';

export const PaymentProvider = [
    {
        provide: repositories.payment_repository,
        useValue: Payment,
    },
];
