import { ProductController } from './products.controller';
import { Module } from "@nestjs/common";
import { ProductsService } from './products.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Productt } from './product.entity';

@Module({
    controllers:[ProductController],
    providers:[ProductsService],
    imports:[TypeOrmModule.forFeature([Productt])]
})
export class ProductModule{

}