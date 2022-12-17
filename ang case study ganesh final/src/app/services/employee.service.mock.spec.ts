import { of } from "rxjs";
import { Employee, EmployeeDetails } from "../models/employee";

// Define Mock Data
export const mockEmployees: Employee[] = [
    {
        "firstName": "Ganesh",
        "lastName": "Amsanipalli",
        "departmentName": "Decision Solutions",
        "dateOfJoining": new Date(),
        "username": "Ganesh",
        "id": "1"
    },
    {
        "firstName": "A",
        "lastName": "ABC",
        "departmentName": "Decision Solutions 1",
        "dateOfJoining": new Date(),
        "username": "Ganesh A",
        "id": "2"
    },
    {
        "firstName": "B",
        "lastName": "XYZ",
        "departmentName": "Decision Solutions",
        "dateOfJoining": new Date(),
        "username": "John",
        "id": "3"
    },
    {
        "firstName": "C",
        "lastName": "BCD",
        "departmentName": "Decision Solutions 3",
        "dateOfJoining": new Date(),
        "username": "Paul",
        "id": "4"
    },
    {
        "firstName": "D",
        "lastName": "UIY",
        "departmentName": "Decision Solutions",
        "dateOfJoining": new Date(),
        "username": "Player",
        "id": "5"
    },
    {
        "firstName": "sample fn",
        "lastName": "sample ln",
        "departmentName": "Decision Solutions",
        "dateOfJoining": new Date(),
        "username": "sampleuser",
        "id": "5"
    }
];

export let mockEmployeeDetails: Map<string, EmployeeDetails> = new Map([
    [mockEmployees[0].id, { department: 'DEP1', deptCount: 0 }],
    [mockEmployees[1].id, { department: 'DEP2', deptCount: 0 }]
]);

// Mock Service
export class TestingServiceMock {
    public getEmployees() {
        return of(mockEmployees);
    }

    public getEmployeeDetails(empId: string) {
        return of(mockEmployeeDetails.get(empId));
    }
}