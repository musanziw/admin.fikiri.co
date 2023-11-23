import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Solution} from "../../solutions/entities/solution.entity";

@Entity()
export class Thematic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Solution, solution => solution.thematics)
    solutions: Solution[];
}
