import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator"

export class RegisterDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    password:string

    @IsOptional()
    @IsString()
    @Length(2,150)
    name:string
}