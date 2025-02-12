import { IsString, IsNotEmpty, isNotEmpty} from "class-validator";
export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    title   :string;

    @IsNotEmpty()
    priceBay:string;

    @IsNotEmpty()
    priceSal:string
}