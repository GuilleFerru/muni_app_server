import { type RegisterUserDto } from "../dtos";
import { type AutEntity } from "../entities";
import { type AuthRepository } from "../repositories/repository";

export interface RegisterUserUseCase {
    execute: (data: RegisterUserDto) => Promise<AutEntity>
}

export class RegisterUser implements RegisterUserUseCase{
    constructor(private readonly repository: AuthRepository) { }

    async execute(data: RegisterUserDto): Promise<AutEntity> {
        return await this.repository.register(data)
    }
}