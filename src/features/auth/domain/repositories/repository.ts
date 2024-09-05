import { type LoginUserDto, type RegisterUserDto } from "../dtos";
import { type UserEntity, type AutEntity } from "../entities";

export abstract class AuthRepository {
    abstract register(dto: RegisterUserDto): Promise<AutEntity>
    abstract login(dto: LoginUserDto): Promise<AutEntity>
    abstract getUserById(dto: string): Promise<UserEntity>

}