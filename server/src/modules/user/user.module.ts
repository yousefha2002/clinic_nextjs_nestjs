import {Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProvider } from './user.repository';
import { DepartmentModule } from '../department/department.module';

@Module({
  controllers: [UserController],
  providers: [UserService,
    ...UserProvider
  ],
  imports:[DepartmentModule],
  exports:[UserService]
})
export class UserModule {}
