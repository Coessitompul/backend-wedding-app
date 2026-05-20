import { LoginPayload } from '../schemas/login.schema';

export class LoginDto implements LoginPayload {
  declare email: string;
  declare password: string;
}
