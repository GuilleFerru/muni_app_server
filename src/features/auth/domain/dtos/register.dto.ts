import { AppError, type ValidationType, ZERO, REGEX_EMAIL, SIX } from "../../../../core";
import { type CoreDto } from "../../../shared";


export class RegisterUserDto implements CoreDto<RegisterUserDto> {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ) {
        this.validate(this);
    }

    public validate(dto: RegisterUserDto): void {
        const errors: ValidationType[] = [];
        const { name, email, password } = dto;

        if (!name || name.length < ZERO) {
            errors.push({ fields: ['name'], constraint: 'Nombre no es valido' });
        }

        if (!email || !REGEX_EMAIL.test(email)) {
            errors.push({ fields: ['email'], constraint: 'Email no es valido' });
        }
        if (!password || password.length < SIX) {
            errors.push({ fields: ['password'], constraint: 'Password no es valido' });
        }
        if (errors.length > ZERO) {
            throw AppError.badRequest('Error de validacion', errors);
        }
    }

    public static create(object: Record<string, unknown>): RegisterUserDto {
        const { name, email, password } = object;
        return new RegisterUserDto(name as string, email as string, password as string);

    }

}
