import { AppError, ZERO } from "../../../../core";

export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailVerified: boolean = false,
        public password: string,
        public role: string[],
        public img?: string
    ) { }

    public static fromJson(obj: Record<string, unknown>): UserEntity {
        const { id, name, email, emailVerified, password, role, img } = obj;
        if (!id) {
            throw AppError.badRequest('Falta id', [{ constraint: 'Se requiere un id', fields: ['id'] }]);
        }
        if (!name || (name as string).length === ZERO) {
            throw AppError.badRequest('Falta nombre', [{ constraint: 'Se requiere un nombre', fields: ['name'] }]);
        }
        if (!email || (email as string).length === ZERO) {
            throw AppError.badRequest('Falta email', [{ constraint: 'Se requiere un email', fields: ['email'] }]);
        }
        if (emailVerified === undefined) {
            throw AppError.badRequest('Se requiere que el email sea verificado', [
                { constraint: 'Verificacion de email requerida', fields: ['emailVerified'] }
            ]);
        }
        if (!password || (password as string).length === ZERO) {
            throw AppError.badRequest('Falta contraseña', [{ constraint: 'Se requiere una contraseña', fields: ['password'] }]);
        }
        if (!role || (role as string).length === ZERO) {
            throw AppError.badRequest('Falta tipo de usuario', [{ constraint: 'Se requiere una tipo de usuario', fields: ['role'] }]);
        }

        return new UserEntity(
            id as string,
            name as string,
            email as string,
            emailVerified as boolean,
            password as string,
            role as string[],
            img as string
        )

    }
}