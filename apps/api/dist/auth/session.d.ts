import { PassportSerializer } from '@nestjs/passport';
import { SerializedUser } from '../types/serialized-user';
export declare class Session extends PassportSerializer {
    serializeUser(user: SerializedUser, done: (err: Error, user: any) => void): void;
    deserializeUser(payload: string, done: (err: Error, payload: string) => void): void;
}
