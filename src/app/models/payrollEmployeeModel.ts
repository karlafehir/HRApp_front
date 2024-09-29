import { Employee } from "./employeeModel";

export interface PayrollEmployee {
  employee: Employee;
  status: 'paid' | 'pending';
  salary: number;
  paymentDate?: Date | null;
  paymentMethod: string;
}
