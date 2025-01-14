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
    Prijavljen = 0, // pregled životopisa
    Intervju = 1,
    Onboarding = 2,
    Zaposlen = 3,
    Odbijen = 4
}

// export enum CandidateStatus {
//     NewApplied = 0,
//     Shortlisted = 1,
//     Interview = 2,
//     Test = 3,
//     Hired = 4
// }
