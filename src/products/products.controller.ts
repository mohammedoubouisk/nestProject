
import { ProductsService } from './products.service';
import { Body, Controller, Get, Param, Post, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-products.dto';
import { ConfigService } from '@nestjs/config';

type ProductType = {id:number, email:string, password: number}

@Controller('/api/products')
export class ProductController{

    constructor(
        private readonly productsService:ProductsService,
     ){}


    @Get()
    public getAllProducts(){

        return this.productsService.getAll()
     
    }

    @Get(":id")
    public getSingleProd(@Param('id', ParseIntPipe) id:number){
        return this.productsService.getOneBy(id)
    }

    @Post()
    public createNewProduct(@Body() body:CreateProductDto){
        return this.productsService.createProduct(body)
    }
    


    @Delete(':id')
    public deleteProductp(@Param('id', ParseIntPipe) id:number){
        return this.productsService.deleteProduct(id)
    }

}