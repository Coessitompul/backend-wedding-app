import { RegisterPayload } from '../schemas/register.schema';

export class RegisterDto implements RegisterPayload {
  declare name: string;
  declare email: string;
  declare password: string;
}
