import { IsString,IsEmail } from "class-validator"

export class loginUserDto {
    @IsEmail()
    @IsString()
    email:string
    
    @IsString()
    password:string
}