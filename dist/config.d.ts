import * as convict from 'convict';
declare const config: convict.Config<{
    bcryptSaltRounds: number;
    jwtSecretKey: string;
}>;
export { config };
