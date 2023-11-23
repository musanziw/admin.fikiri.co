import { Thematic } from "../../thematics/entities/thematic.entity";
export declare class Solution {
    id: number;
    name: string;
    solved_problem: string;
    solution_description: string;
    steps: string;
    video_link: string;
    thematics: Thematic[];
}
