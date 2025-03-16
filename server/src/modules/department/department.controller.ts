import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { createDepartmentDto } from './dto/ceate-department.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { departmentDto } from './dto/department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Serilaize(departmentDto)
  @UseGuards(AdminGuard)
  @Post('create')
  createDepartment(@Body() body:createDepartmentDto)
  {
    return this.departmentService.create(body.name)
  }

  @Serilaize(departmentDto)
  @UseGuards(AdminGuard)
  @Patch('/:id')
  updateDepartment(@Param('id') id:string,@Body() body:createDepartmentDto)
  {
    return this.departmentService.update(body.name,+id)
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  deleteDepartment(@Param('id') id:string)
  {
    return this.departmentService.remove(+id)
  }

  @Serilaize(departmentDto)
  @Get(':id')
  async getDepartment(@Param('id') id:string)
  {
    const department = await this.departmentService.findOne(+id)
    if(!department)
    {
      throw new NotFoundException('department is not found')
    }
    return department ;
  }

  @Get()
  getDepartments()
  {
    return this.departmentService.findAll()
  }
}
