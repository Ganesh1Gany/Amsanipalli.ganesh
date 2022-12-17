import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { employeeActions } from '../employees/actions/employee.actions';
import { employeeFeatureKey } from '../employees/reducers/employee.reducers';
import { selectAllEmployees } from '../employees/selectors/employee.selectors';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  employeeDetails!: Employee;
  currentEmployeeDetails: any;
  helloEmpName = { value : this.employeeDetails ? this.employeeDetails['username'] : ''};

  constructor(
    private loginSer: LoginService,
    private router: Router,
    private readonly store: Store<{[employeeFeatureKey]: Employee[]}>,
    private empSer: EmployeeService) {
    this.loadEmployees();
    const obj = this.loginSer['loginCred'][0];
    this.currentEmployeeDetails = this.store.pipe(select(selectAllEmployees)).subscribe(e => {
      this.employeeDetails = e.filter(x => x.id === obj['id'])[0];
      this.helloEmpName = { value : this.employeeDetails ? this.employeeDetails['username'] : ''};
    });
    this.empSer.showLogout.next(true);
  }

  public loadEmployees() {
    this.store.dispatch(employeeActions.loadEmployees());
  }

  ngOnInit(): void {
  }

  toEmployee() {
    this.router.navigate(['home/employees']);
  }

  selectedTabChanged(e : any) {
    if(e) {
      switch(e['index']) {
        case 0: this.router.navigate(['/home', 'employees', 'employee-list']); break;
        case 1: this.router.navigate(['/home', 'employees', 'employee-summary']); break;
        default: this.router.navigate(['/home', 'employees', 'employee-list']); break;
      }
    }
  }
}
