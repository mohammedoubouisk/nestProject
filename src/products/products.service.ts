import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateProductDto } from "./dtos/create-products.dto"
import { Repository } from "typeorm"
import { Productt } from "./product.entity"
import { InjectRepository } from "@nestjs/typeorm"


@Injectable()
export class ProductsService {
   
    constructor(
        @InjectRepository(Productt)
        private readonly productRepository:Repository<Productt>
    ){}

    
        public getAll(){
           return this.productRepository.find()
        }

        public async getOneBy(id:number){
            const Prod = await this.productRepository.findOne({where:{id}});
            if(!Prod)
                throw new NotFoundException("product not found")
            return Prod;
        }

        public async createProduct(dto: CreateProductDto) {
            try {
              const newProd = this.productRepository.create(dto);
              return await this.productRepository.save(newProd);
            } catch (error) {
              throw new Error(`Failed to create product: ${error.message}`);
            }
          }


        public async deleteProduct(id:number){
            const Prod = await this.getOneBy(id)
            await this.productRepository.remove(Prod)
            return {messsage:"product removed"}       
        }
}