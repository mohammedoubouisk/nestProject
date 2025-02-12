
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { CURRENT_TIMESTAMP } from "src/utils/constant";
import {Productt} from '../products/product.entity'
import { USerEntit } from "src/users/user.entity";


@Entity({name:"reviews"})
export class ReviewEntit{
    @PrimaryGeneratedColumn()
    id:string

    @Column({type:'int'})
    rating: number

    @Column()
    comment: string

    @CreateDateColumn({type:"timestamp", default:()=>CURRENT_TIMESTAMP})
        createAt:Date;
    
    @UpdateDateColumn({type:"timestamp", default:()=>CURRENT_TIMESTAMP, onUpdate:CURRENT_TIMESTAMP})
        updateAt:Date;


    @ManyToOne(()=>Productt,(product)=>product.review)
    product:Productt;

    @ManyToOne(()=>USerEntit, (users)=>users.reviews)
    users:USerEntit;

}