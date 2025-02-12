import {Module} from '@nestjs/common';
import { UserModule } from './users/users.module';
import { ProductModule } from './products/products.module';
import { ReviewModule } from './reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productt } from './products/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USerEntit } from './users/user.entity';
import { ReviewEntit } from './reviews/review.entity';
import { LdapService } from './ldap/ldap.service';
import { LdapController } from './ldap/ldap.controller';


@Module({
    imports:[UserModule,
             ProductModule, 
             ReviewModule,
  
             TypeOrmModule.forRootAsync({
                inject:[ConfigService],
                useFactory:(config: ConfigService)=>{
                    return{
                        type:"mysql",
                        host:"localhost",
                        port: config.get<number>('DB_PORT'),
                        username: config.get<string>('DB_USERNAME'),
                        password: config.get<string>('DB_PASSWORD'),
                        database: config.get<string>('DB_DATABASE'),
                        synchronize: false,
                        entities:[Productt,USerEntit,ReviewEntit],
                    }
                }
                
             }),
             ConfigModule.forRoot({
                isGlobal:true,
                envFilePath:`.env.development`
             }),
            ],
    providers: [LdapService],
    controllers: [LdapController],
})
export class AppModule{};