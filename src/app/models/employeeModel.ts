import { Job } from "./jobModel";



export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  dateOfHire: Date; 
  jobId: number;
  job: any; 
  departmentId: number;
  managerId: number | null;
  jobTitle: string;
  salary: number;
  employmentStatus: string;
  annualLeaveDays?: number | null;
  sickLeaveDays?: number | null;
  remainingAnnualLeave?: number | null;
  remainingSickLeave?: number | null;
}

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  dateOfHire: Date; 
  jobId: number;
  job: any; 
  departmentId: number;
  managerId: number | null; 
  jobTitle: string;
  salary: number;
  employmentStatus: string;
}

export interface Department {
  id?: number;
  name: string;
  managerId: number;
  manager: Manager;
  employees: Employee[];
}

