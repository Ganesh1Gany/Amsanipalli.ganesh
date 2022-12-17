import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  e!: { index: number; };
  editList = true;
  isAddEmployee = false;
  constructor(private router: Router, private empSer: EmployeeService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.e = { index: 0 };
    this.selectedTabChanged(this.e);
    this.empSer.editAction.subscribe(e => {
      if (e === 'Edit') {
        this.isAddEmployee = false;
      } else if (e === 'Add') {
        this.isAddEmployee = true;
      } else {
        this.isAddEmployee = false;
      }
    });
    this.empSer.showLogout.next(true);
  }

  selectedTabChanged(e: any) {
    if (e) {
      switch (e['index']) {
        case 0: this.router.navigate(['/employees', 'employee-list']); this.editList = true; this.empSer.editAction.next(''); break;
        case 1: this.router.navigate(['/employees', 'employee-summary']); this.editList = false; this.empSer.editAction.next(''); break;
        default: this.router.navigate(['/employees', 'employee-list']); this.editList = false; this.empSer.editAction.next(''); break;
      }
    }
  }

  addEmployee() {
    this.isAddEmployee = true;
    this.empSer.editAction.next('Add');
    this.empSer.scrollToBottom();
  }
}
