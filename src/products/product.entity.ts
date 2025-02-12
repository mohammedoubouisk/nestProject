import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from "typeorm";
import { CURRENT_TIMESTAMP } from "../utils/constant";
import {ReviewEntit} from '../reviews/review.entity'
import { USerEntit } from "src/users/user.entity";

@Entity({name:"products"})
export class Productt{

    

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar", length:"40"})
    title:string;

    @Column()
    priceBay:string;

    @Column()
    PriceSal:string;

    @CreateDateColumn({type:"timestamp", default:()=>CURRENT_TIMESTAMP})
    createAt:Date;

    @UpdateDateColumn({type:"timestamp", default:()=>CURRENT_TIMESTAMP, onUpdate:CURRENT_TIMESTAMP})
    updateAt:Date;


    @OneToMany(()=>ReviewEntit,(review)=>review.product)
    review: ReviewEntit[];

    @ManyToOne(()=>USerEntit, (users)=>users.products)
    users: USerEntit

    

}