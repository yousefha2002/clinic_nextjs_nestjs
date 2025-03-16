import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Department } from './entities/department.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DepartmentService {
    constructor(@Inject(repositories.department_repository) private departmentRepo:typeof Department){}

    async create(name:string)
    {
        const department = await this.departmentRepo.create({name})
        await department.save()
        return department
    }

    async update(name:string,id:number)
    {
        const department = await this.checkDepartment(id)
        department.name = name
        await department.save()
        return department
    }

    async remove(id:number)
    {
        const department = await this.checkDepartment(id)
        department.destroy()
        return {message:"department has been deleted"}
    }

    findOne(id:number)
    {
        return this.departmentRepo.findByPk(id)
    }

    findAll()
    {
        return this.departmentRepo.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        })
    }

    async checkDepartment(id:number)
    {
        const department = await this.findOne(id)
        if(!department)
        {
            throw new NotFoundException('department is not found')
        }
        return department
    }
}
