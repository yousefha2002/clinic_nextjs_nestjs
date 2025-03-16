import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentProvider } from './department.repository';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService,...DepartmentProvider],
  exports:[DepartmentService]
})
export class DepartmentModule {}
