
import { Module} from "@nestjs/common";
import { ReviewController } from "./reviews.controller";
import { ReviewsService } from "./review.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewEntit } from "./review.entity";

@Module({
    controllers:[ReviewController],
    providers:[ReviewsService],
    imports:[TypeOrmModule.forFeature([ReviewEntit])]
})

export class ReviewModule{


}