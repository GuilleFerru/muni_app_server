import {type NexFunction, type Request, type Response} from 'express';
import { HttpCode, type SuccessResponse } from '../../../core';
import {
    type AuthRepository,
    RegisterUserDto,
    LoginUser,
    type AuthEntity,
    RegisterUser,
    LoginUserDto
} from '../domain';

interface RequestBodyLogin {
    email: string;
    password: string;
}

interface RequestBodyRegister {
    name: string;
    email: string;
    password: string;
}

export class AuthController {

    constructor(private readonly repository: AuthRepository){}

    public login = (
        req: Request<unknown, unknown, RequestBodyLogin>,
        res: Response<SuccessResponse<AuthEntity>>,
        next: NexFunction
    ): void =>{
        const {email, password} = req.body;
        const dto = LoginUserDto.create({email, password});
        new LoginUser(this.repository).execute(dto).then((result)=> res.json({data: result}).catch(next));
    }

    public register = (
        req: Request<unknown, unknown, RequestBodyLogin>,
        res: Response<SuccessResponse<AuthEntity>>,
        next: NexFunction
    ): void => {
        const {email, name, password} = req.body;
        const dto = RegisterUserDto.create({email, name, password});
    }

}