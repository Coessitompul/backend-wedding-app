import { LoginPayload } from '../schemas/login.schema';
export declare class LoginDto implements LoginPayload {
    email: string;
    password: string;
}
