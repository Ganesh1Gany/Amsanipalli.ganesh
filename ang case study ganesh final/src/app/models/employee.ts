export class Employee {
    id!: string;
    firstName!: string;
    lastName!: string;
    departmentName!: string;
    dateOfJoining!: Date;
    username!: string;
}

export class User {
    username!: string;
}

export interface EmployeeDetails {
    department: string;
    deptCount: number;
}
