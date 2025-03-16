import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserEmailDto } from './dto/user-email.dto';
import { UserPasswordDto } from './dto/user-password.dto';
import { userInformationDto } from './dto/user-information';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from './entities/user.entity';
import { Roles } from 'src/decorators/role.decorator';
import { UserRole } from 'src/common/enums/roles';
import { loginUserDto } from './dto/login-user.dto';
import { UserGuard } from 'src/guards/user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serilaize(UserDto)
  @Post('signup')
  @UseGuards(AdminGuard)
  async signUpUser(@Body() body:createUserDto)
  {
    return this.userService.signUp(body)
  }

  @Post('login')
  async loginUser(@Body() body:loginUserDto)
  {
    return this.userService.login(body)
  }

  @Serilaize(UserDto)
  @Patch('email')
  @Roles(UserRole.DOCTOR,UserRole.PATIENT)
  @UseGuards(UserGuard)
  changeUserEmail(@Body() body:UserEmailDto,@CurrentUser() user:User)
  {
    return this.userService.changeEmail(body.newEmail,+user.id)
  }
  
  @Serilaize(UserDto)
  @Patch('password')
  @Roles(UserRole.DOCTOR,UserRole.PATIENT)
  @UseGuards(UserGuard)
  changeUserPassword(@Body() body:UserPasswordDto,@CurrentUser() user:User)
  {
      return this.userService.changePassword(body,+user.id)
  }

  @Serilaize(UserDto)
  @Roles(UserRole.DOCTOR,UserRole.PATIENT)
  @UseGuards(UserGuard)
  @Patch('information')
  changeUserInformation(@Body() body:userInformationDto,@CurrentUser() user:User)
  {
    return this.userService.update(+user.id,body)
  }

  @Serilaize(UserDto)
  @Get()
  getUsers(@Query('role') role:UserRole)
  {
    return this.userService.findUsers(role)
  }

  @Serilaize(UserDto)
  @Roles(UserRole.DOCTOR,UserRole.PATIENT)
  @UseGuards(UserGuard)
  @Get('profile')
  async getCurrentUser(@CurrentUser() user:User)
  {
    const existUser = await this.userService.findOne(+user.id)
    if(!existUser)
    {
      throw new NotFoundException('user is not found')
    }
    return existUser
  }

  @Serilaize(UserDto)
  @Get(':id')
  async getUser(@Param('id') id:string)
  {
    const user = await this.userService.findOne(+id)
    if(!user)
    {
      throw new NotFoundException('user is not found')
    }
    return user
  }
}