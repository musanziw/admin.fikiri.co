import { Role } from '../../roles/entities/role.entity';
export declare class User {
    id: number;
    name: string;
    phone: string;
    address: string;
    email: string;
    password: string;
    is_active: boolean;
    reset_token: string;
    created_at: Date;
    updated_at: Date;
    roles: Role[];
}
