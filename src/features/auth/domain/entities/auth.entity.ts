import { type UserEntity } from './user.entity';

export class AutEntity {
    constructor(
        public readonly user: Omit<UserEntity, 'password'>,
        public readonly token: string
    ) { }
}