
import {Injectable } from "@nestjs/common";

@Injectable()
export class ReviewsService{
constructor(){}

    public getAll(){

        return[
            {id:1, email:"review22@gmail.com", password:1123445},
            {id:2, email:"review11@gmail.com", password:122223344}
        ]
    }
}