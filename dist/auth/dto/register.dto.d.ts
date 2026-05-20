import { RegisterPayload } from '../schemas/register.schema';
export declare class RegisterDto implements RegisterPayload {
    name: string;
    email: string;
    password: string;
}
