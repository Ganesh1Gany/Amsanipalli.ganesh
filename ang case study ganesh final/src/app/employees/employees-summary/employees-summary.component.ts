import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EmployeeService } from '../../services/employee.service';
import { employeeFeatureKey } from '../reducers/employee.reducers';
import { selectAllEmployees, selectEmployeeCount } from '../selectors/employee.selectors';
import { Employee } from '../store/employee.store';

@Component({
  selector: 'employee-summary',
  templateUrl: './employees-summary.component.html',
  styleUrls: ['./employees-summary.component.scss']
})
export class EmployeesSummaryComponent implements OnInit {

  employeeTotals = {
    totalEmpCount: 0,
    totalEmpCountByDep!: [{ department: '', length: 0 }]
  };
  employeeCount$: any;

  constructor(private empSer: EmployeeService, private readonly store: Store<{ [employeeFeatureKey]: Employee[] }>) {
    this.employeeCount$ = this.store.pipe(select(selectEmployeeCount));
    this.store.pipe(select(selectAllEmployees)).subscribe({
      next: (emps) => {
        let arr = [];
        const unique: any = [...new Set(emps.map((item: any) => item.departmentName))];
        for (let i = 0; i < unique.length; i++) {
          arr.push(
            {
              "department": unique[i],
              "length": emps.filter((x: any) => x.departmentName === unique[i]).length
            }
          );
        }
        this.employeeTotals.totalEmpCountByDep = arr;
      }
    });
  }

  ngOnInit(): void {
  }
}
