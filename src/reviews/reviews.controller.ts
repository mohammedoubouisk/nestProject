

import { ReviewsService } from "./review.service";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class ReviewController{

    constructor(
        private readonly reviewsServices:ReviewsService,

    ){}

    @Get('/api/reviews')
    public getAllReview(){
        return this.reviewsServices.getAll()
    }

}