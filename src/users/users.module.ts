import { UsersService} from './users.service';
import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
    import { TypeOrmModule } from '@nestjs/typeorm';
import { USerEntit } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers:[UserController],
    providers:[UsersService],
    imports:[TypeOrmModule.forFeature([USerEntit]),
             JwtModule.registerAsync({
                inject: [ConfigService],
                useFactory:(config: ConfigService)=>{
                    return{
                        global:true,
                        secret:config.get<string>("JWT_SECRET"),
                        signOptions:{expiresIn: config.get<string>("JWT_EXPIRES_IN")}
                    }
                }
             })     
]
})
export class UserModule{}