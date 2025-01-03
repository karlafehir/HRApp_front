export interface Payroll {
  id: number;
  employeeId: number;
  date: Date;
  salary: number;
  bonus: number;
  isComplete: boolean;
  employee: {
    firstName: string;
    lastName: string;
  };
}
