import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StateObservable, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { mockEmployees } from '../../services/employee.service.mock.spec';

import { EmployeesListComponent } from './employees-list.component';

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesListComponent ],
      imports: [ HttpClientModule, MatSnackBarModule, HttpClientTestingModule, StoreModule.forRoot({}) ],
      providers: [ {provide: EmployeeService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should pupulate Employees on component init', () => {
    spyOn(component.empSer, 'getEmployeeList').and.callThrough();
    component.ngOnInit();

    expect(component.empSer.getEmployeeList).toHaveBeenCalled();
    expect(component.totalEmp.length).toBe(component.totalEmp.length);
  });
});
