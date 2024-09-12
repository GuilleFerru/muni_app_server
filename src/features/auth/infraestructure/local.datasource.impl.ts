import { AppError, ONE, basicEncript, basicJWT } from '../../../core';
import { type RegisterUserDto, type AuthDatasource, UserEntity, AuthEntity, type LoginUserDto } from '../domain';


const USER_MOCK = [
    {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        emailVerified: false,
        password: 'ca0711461f3b8387d01cc0c0cf532a4fb4b5fdf0207f7902fa75580718da497a',
        role: ['USER_ROLE'],
        avatar: 'https://avatars.dicebear.com/api/initials/T.svg'
    },
    {
        id: '2',
        name: 'Test User 2',
        email: 'test2@test.com',
        emailVerified: false,
        password: 'ca0711461f3b8387d01cc0c0cf532a4fb4b5fdf0207f7902fa75580718da497a',
        role: ['USER_ROLE']
    }
]

export class AuthDataSourceImpl implements AuthDatasource {

    public async register(dto: RegisterUserDto): Promise<AuthEntity> {
        const user = USER_MOCK.find(user => user.email === dto.email);

        if (user) {
            throw AppError.badRequest('El usuario ya existe', [
                { constraint: 'El usuario ya existe', fields: ['email'] }
            ]);
        }
        const createdUser = {
            ...dto,
            id: (USER_MOCK.length + ONE).toString(),
            emailVerified: false,
            role: ['USER_ROLE'],
        }

        createdUser.password = basicEncript.hashPassword(dto.password);
        USER_MOCK.push(createdUser);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = UserEntity.fromJson(createdUser);
        const token = basicJWT.generateToken({ id: createdUser.id });
        return new AuthEntity(rest, token);

    }

    public async login(dto: LoginUserDto): Promise<AuthEntity> {
        const user = USER_MOCK.find(user => user.email === dto.email);
        if (!user) throw AppError.badRequest('El usuario no existe');
        const isPasswordMatch = basicEncript.comparePassword(dto.password, user.password);
        if (!isPasswordMatch) throw AppError.badRequest('Contraseña incorrecta');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = UserEntity.fromJson(user);
        const token = basicJWT.generateToken({ id: user.id });
        return new AuthEntity(rest, token);
    }

    public async getUserById(dto: string): Promise<UserEntity> {
        const user = USER_MOCK.find(user => user.id === dto);
        if (!user) throw AppError.badRequest('El usuario no existe');
        return UserEntity.fromJson({ ...user });

    }

}