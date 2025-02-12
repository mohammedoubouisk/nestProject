import { LoginDto } from './dto/login.dto';

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { USerEntit } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import {JWTPayloadType, AccessTockenType} from '../utils/types'



@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(USerEntit)
        private readonly userRepository: Repository<USerEntit>,
        private readonly jwtService: JwtService,
  //he gonna read sercet key an expires in from user.Module
    ){}

    public async register(registerDto:RegisterDto): Promise<AccessTockenType>{
        const {email, password, name} = registerDto;
        const userFromDb = await this.userRepository.findOne({where:{email}});
        if (userFromDb)
            throw new BadRequestException("this user already existe try another email")
        const salt = await bcrypt.genSalt(10);      
        const hashedPass = await bcrypt.hash(password, salt)
        
        let newUser = this.userRepository.create({
            name,
            email,
            password: hashedPass
        });

        newUser = await this.userRepository.save(newUser)

    
        const accessToken = await this.generateJWT({id: newUser.id, UserType: newUser.userType});

        return {accessToken};
    }

    public async login(loginDto:LoginDto):Promise<AccessTockenType>{

        const {email, password}= loginDto;
        const user = await this.userRepository.findOne({where:{email}})
        if(!user)
            throw new BadRequestException("invalid email or email")
       const ispasswordMtch = await bcrypt.compare(password, user.password);
       if(!ispasswordMtch)
        throw new BadRequestException("invalid passord ou email")

       const accessToken = await this.generateJWT({id:user.id, UserType:user.userType})

       return {accessToken}
    }

    private generateJWT(payload: JWTPayloadType): Promise<string>{
        return this.jwtService.signAsync(payload)
    }


    public async getCurrentUser(id): Promise<USerEntit[]>{
        const user = await this.userRepository.find({where:{id}})
        if(!user)
            throw new NotFoundException("user not found check another id")
        return user 
    }

    public async GetAllUsr(): Promise<USerEntit[]>{
        return this.userRepository.find()
    }
}