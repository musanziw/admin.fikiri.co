import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Thematic } from '../../thematics/entities/thematic.entity';

@Entity()
export class Solution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'longtext' })
  solved_problem: string;

  @Column({ type: 'longtext' })
  solution_description: string;

  @Column({ type: 'longtext' })
  expansion_project: string;

  @Column({ type: 'longtext' })
  steps: string;

  @Column()
  video_link: string;

  @ManyToMany(() => Thematic, (thematic) => thematic.solutions, {
    cascade: true,
  })
  @JoinTable()
  thematics: Thematic[];
}
