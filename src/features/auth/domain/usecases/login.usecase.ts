import { type LoginUserDto } from "../dtos";
import { type AutEntity } from "../entities";
import { type AuthRepository } from "../repositories/repository";


export interface LoginUserUseCase {
    execute: (data: LoginUserDto) => Promise<AutEntity>
}

export class LoginUser implements LoginUserUseCase {
    constructor(private readonly repository: AuthRepository) { }

    async execute(data: LoginUserDto): Promise<AutEntity> {
        return await this.repository.login(data)
    }
}