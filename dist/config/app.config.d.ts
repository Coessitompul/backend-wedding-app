export declare const appConfig: (() => {
    port: number;
    nodeEnv: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    frontendUrl: string;
    databaseUrl: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    nodeEnv: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    frontendUrl: string;
    databaseUrl: string | undefined;
}>;
