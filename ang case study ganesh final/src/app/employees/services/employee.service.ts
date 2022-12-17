import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable } from "rxjs";
import { Employee } from "../store/employee.store";

@Injectable({
    providedIn: "root"
})
export class EmployeeService {
    constructor(public http: HttpClient) {
        // NOP
    }

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>('/assets/api/employee/employee-list.json');
    }
}
