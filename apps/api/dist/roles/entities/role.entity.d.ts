import { User } from '../../users/entities/user.entity';
export declare class Role {
    id: number;
    name: string;
    is_active: boolean;
    users: User[];
}
