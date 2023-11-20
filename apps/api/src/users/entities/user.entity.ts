import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {Role} from '../../roles/entities/role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: true})
    is_active: boolean;

    @Column({nullable: true})
    reset_token: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Role, (role: Role) => role.users, {
        cascade: true,
    })
    @JoinTable()
    roles: Role[];
}
