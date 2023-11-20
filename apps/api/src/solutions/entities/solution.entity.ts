import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Thematic} from "../../thematics/entities/thematic.entity";

@Entity()
export class Solution {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    solved_problem: string;

    @Column()
    solution_description: string;

    @Column()
    steps: string;

    @Column()
    video_link: string

    @ManyToMany(() => Thematic, thematic => thematic.solutions, {
        cascade: true,
    })
    @JoinTable()
    thematics: Thematic[];
}
