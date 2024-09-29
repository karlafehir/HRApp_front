import { Job } from "./jobModel";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  dateOfHire: Date;
  
  jobId: number;
  job: Job;
  departmentId: number;
  managerId: number;
  
  jobTitle: string;
  salary: number; 
  employmentStatus: string;
}
