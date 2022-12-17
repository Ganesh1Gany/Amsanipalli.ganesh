import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Employee } from '../models/employee';

import { EmployeeService } from './employee.service';
import { mockEmployees } from './employee.service.mock.spec';
const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MatSnackBarModule ],
      providers: [ {provide: HttpClient, useValue: httpClientSpy} ]
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should receive Employees', () => {
    httpClientSpy.get.and.returnValue(of(mockEmployees));

    service.getEmployeeList().subscribe({
      next: (res: Employee[]) => {
        expect(res.length).toBe(mockEmployees.length);
        expect(res).toEqual(mockEmployees);
      }
    });
  });
});
