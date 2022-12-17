import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { employeeActions } from '../actions/employee.actions';
import { employeeFeatureKey } from '../reducers/employee.reducers';
import { selectAllEmployees } from '../selectors/employee.selectors';
import { Employee } from '../store/employee.store';

export interface PeriodicElement {
  firstName: string,
  lastName: string,
  departmentName: string,
  dateOfJoining: string,
  username: string
}

@Component({
  selector: 'employee-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})

export class EmployeesListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'departmentName', 'dateOfJoining', 'username', 'deleteicon'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  isEditEmployee = false;
  selectedEmployeeData: any;

  public books$: Observable<Employee[]>;

  editBook = false;
  totalEmp = [];

  constructor(public empSer: EmployeeService, private readonly store: Store<{[employeeFeatureKey]: Employee[]}>) {
    this.books$ = this.store.pipe(select(selectAllEmployees));
  }

  ngOnInit(): void {
    this.empSer.getEmployeeList().subscribe(e => {
      this.books$.subscribe((k: any) => {
        this.totalEmp = k;
        this.dataSource = new MatTableDataSource<PeriodicElement>(k);
      });
    });
    this.empSer.editAction.subscribe(k => {
      if(k === 'Add') {
        this.isEditEmployee = false;
      } else if(k === 'Edit') {
        this.isEditEmployee = true;
      } else {
        this.isEditEmployee = false;
      }
    });
  }

  onRowClick(row: any) {
    this.isEditEmployee = false;
    this.isEditEmployee = true;
    this.selectedEmployeeData = row;
    this.empSer.editAction.next('Edit');
    this.empSer.scrollToBottom();
  }

  deleteEmployee(element: any, i: any) {
    this.store.dispatch(employeeActions.deleteEmployee({data: element.username}));
    this.empSer.openSnackBar1('Deleted Successfully !!', 1000, 'success');
  }
}