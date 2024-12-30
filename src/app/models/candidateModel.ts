export interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    resumeUrl: string;
    githubUrl: string,
    jobId: number;
    status: CandidateStatus; 
}

export enum CandidateStatus {
    NewApplied = 0,
    Shortlisted = 1,
    Interview = 2,
    Test = 3,
    Hired = 4
}

