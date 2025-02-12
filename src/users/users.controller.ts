import { Body, Controller, HttpCode, Post, HttpStatus, Get, UseGuards, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./guards/auth.guard";
import { CurrentUser } from "./decorators/current-user.decorator";
import { JWTPayloadType } from "src/utils/types";


@Controller('api/users/')

export class UserController{

    constructor(
        private readonly usersService:UsersService,
    ){}

    @Post('auth/register')
    public register(@Body() body:RegisterDto){
        return this.usersService.register(body)
    }

    @Post('auth/login')
    @HttpCode(HttpStatus.OK)
    public login(@Body() body:LoginDto){
        return this.usersService.login(body)
    }

    @Get('current-user')
    @UseGuards(AuthGuard)
    public getCurentUser(@CurrentUser() payload: JWTPayloadType){
        return this.usersService.getCurrentUser(payload.id)
    }

    @Get()
    public getAllUsers(){
        return this.usersService.GetAllUsr()
    }
}