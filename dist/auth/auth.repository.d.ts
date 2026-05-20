import { PrismaService } from '../prisma/prisma.service';
import { Users, Prisma } from '@prisma/client';
export declare class AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<Users | null>;
    findByUuid(uuid: string): Promise<Users | null>;
    create(data: Prisma.UsersCreateInput): Promise<Users>;
}
