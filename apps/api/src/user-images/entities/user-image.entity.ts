import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity()
export class UserImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    thumb: string;

    @OneToMany(() => User, (user: User) => user.userImages)
    users: User;
}
