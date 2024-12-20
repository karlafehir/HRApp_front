import { Candidate } from "./candidateModel";

export interface Job {
    id?: number;
    title: string;
    description: string;
    department: string;
    departmentId: number;
    postedDate: string;
    closingDate: string;
    status: string;
    location: string;
    priority: string;
    candidates: Candidate[];
}
 