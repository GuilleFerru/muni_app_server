import { AppError, type ValidationType, ZERO, REGEX_EMAIL, SIX } from "../../../../core";
import { type CoreDto } from "../../../shared";


export class LoginUserDto implements CoreDto<LoginUserDto> {

    private constructor(
        public readonly email: string,
        public readonly password: string
    ) {
        this.validate(this);
    }

    public validate(dto: LoginUserDto): void {
        const errors: ValidationType[] = [];
        const { email, password } = dto;

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

    public static create(object: Record<string, unknown>): LoginUserDto{
        const { email, password } = object;
        return new LoginUserDto(email as string, password as string);
    }

}
