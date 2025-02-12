
import { Productt } from 'src/products/product.entity';
import { ReviewEntit } from 'src/reviews/review.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from 'src/utils/enums';


@Entity('users')
export class USerEntit{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar", length:"150", nullable:true})
    name:string

    //{type:"varchar", length:"250" , unique: true}

    @Column()
    email:string 

    @Column()
    password:string


    @Column({type:"enum", enum:UserType, default: UserType.NORMAL_USER})
    userType:UserType

    @Column({default:false})
    isAccountVerified: boolean 

    @ManyToOne(()=>Productt, (products)=>products.users)
    products:Productt[]

    @OneToMany(()=>ReviewEntit,(reviews)=>reviews.users)
    reviews:ReviewEntit





}