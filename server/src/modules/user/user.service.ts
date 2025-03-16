import { DepartmentService } from './../department/department.service';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/create-user.dto';
import { comparePassword, hashPassword } from 'src/common/utils/password';
import { UserRole } from 'src/common/enums/roles';
import { loginUserDto } from './dto/login-user.dto';
import { UserPasswordDto } from './dto/user-password.dto';
import { generateToken } from 'src/common/utils/generateToken';
import { Department } from '../department/entities/department.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject(repositories.user_repository) private userRepo:typeof User,
        private DepartmentService:DepartmentService
    ){}

    async signUp(body:createUserDto)
    {
        if(body.role === UserRole.DOCTOR)
        {
            await this.DepartmentService.checkDepartment(+body.departmentId)
        }
        if(body.role!== UserRole.DOCTOR && body.departmentId){
            throw new BadRequestException('Invalid Role')
        }
        const userByEmail = await this.findByEmail(body.email)
        if(userByEmail)
        {
            throw new BadRequestException('email is in use')
        }
        const passwordHased = await hashPassword(body.password)
        const user = await this.userRepo.create({...body,password:passwordHased})
        await user.save()
        return user ;
    }

    async login(body:loginUserDto)
    {
        const userByEmail = await this.findByEmail(body.email)
        if(!userByEmail)
        {
            throw new NotFoundException('email is not found')
        }
        const isMatch = await comparePassword(body.password,userByEmail.password)
        if(!isMatch)
        {
                throw new BadRequestException('password is wrong')
        }
        const payload = {id:userByEmail.id,role:userByEmail.role}
        const access_token = generateToken(payload)
        return {user:{id:userByEmail.id,email:userByEmail.email},token:access_token,role:userByEmail.role}
    }

    async changeEmail(newEmail:string,userId:number)
    {
        const user = await this.findOne(userId)
        if(!user)
        {
            throw new NotFoundException('user is not found')
        }
        const userByEmail = await this.findByEmail(newEmail)
        if(userByEmail)
        {
            throw new BadRequestException('email is in use')
        }
        user.email = newEmail
        await user.save()
        return user
    }

    async changePassword(body:UserPasswordDto,userId:number)
    {
        const {oldPassword,newpassword} = body
        const user = await this.findOne(userId)
        if(!user)
        {
            throw new NotFoundException('user is not found')
        }
        const isMatch = await comparePassword(oldPassword,user.password)
        if(!isMatch)
        {
            throw new BadRequestException('password is wrong')
        }
        const hashedPassword = await hashPassword(newpassword)
        user.password = hashedPassword
        await user.save()
        return user
    }

    async update(userId:number,attrs:Partial<User>)
    {
        const user = await this.findOne(userId)
        if(!user)
        {
            throw new NotFoundException('user is not found')
        }
        Object.assign(user,attrs)
        await user.save()
        return user ;
    }

    findUsers(role:UserRole)
    {
        return this.userRepo.findAll({
            where:{role},
            include:[{model:Department,attributes:['name']}]
        })
    }

    findByEmail(email:string)
    {
        return this.userRepo.findOne({where:{email}})
    }

    findOne(id:number)
    {
        return this.userRepo.findOne({
            where:{id},
            include:[{model:Department,attributes:['name']}]
        })
    }

    findUserRole(id:number,role:string)
    {
        return this.userRepo.findOne({where:{id,role}})
    }

    countDoctors()
    {
        return this.userRepo.count({where:{role:UserRole.DOCTOR}})
    }

    countPatients()
    {
        return this.userRepo.count({where:{role:UserRole.PATIENT}})
    }
}
