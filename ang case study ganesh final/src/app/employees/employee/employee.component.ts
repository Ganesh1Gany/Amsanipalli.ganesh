import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';
import { employeeActions } from '../actions/employee.actions';
import { employeeFeatureKey } from '../reducers/employee.reducers';
import { selectAllEmployees } from '../selectors/employee.selectors';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  error: string = '';
  userNotFound: boolean = false;
  editEmployee = true;

  @Input('employeeData') employeeData: Employee = {
    "id": '',
    "firstName": '',
    "lastName": '',
    "departmentName": '',
    "dateOfJoining": new Date(),
    "username": '',
  };
  @Input('type') type: string = '';
  cardTitle = '';
  employeesLen: any;
  panelClass = ['fis-style', 'ruf-info', 'ruf-inkbar-bottom'];

  constructor(private formBuilder: FormBuilder,
    private readonly store: Store<{ [employeeFeatureKey]: Employee[] }>,
    private empSer: EmployeeService,
    private _snackBar: MatSnackBar) {
    this.store.pipe(select(selectAllEmployees)).subscribe(e => this.employeesLen = e.length);
  }

  ngOnInit(): void {
    this.editEmployee = true;
    this.loginForm = this.formBuilder.group({
      firstName: new FormControl(this.employeeData.firstName, [Validators.required]),
      lastName: new FormControl(this.employeeData.lastName, [Validators.required]),
      departmentName: new FormControl(this.employeeData.departmentName, [Validators.required]),
      username: new FormControl(this.employeeData.username, [Validators.required]),
      dateOfJoining: new FormControl(formatDate(this.employeeData.dateOfJoining, 'yyyy-MM-dd', 'en'), [Validators.required])
    });
    this.cardTitle = this.type === 'Add' ? 'Add Employee' : (this.type === 'Edit') ? 'Edit Employee' : '';
  }

  ngOnChanges() {
    this.editEmployee = true;
    this.loginForm = this.formBuilder.group({
      firstName: new FormControl(this.employeeData.firstName, [Validators.required]),
      lastName: new FormControl(this.employeeData.lastName, [Validators.required]),
      departmentName: new FormControl(this.employeeData.departmentName, [Validators.required]),
      username: new FormControl(this.employeeData.username, [Validators.required]),
      dateOfJoining: new FormControl(formatDate(this.employeeData.dateOfJoining, 'yyyy-MM-dd', 'en'), [Validators.required])
    });
    this.cardTitle = this.type === 'Add' ? 'Add Employee' : (this.type === 'Edit') ? 'Edit Employee' : '';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    } else {
      if (this.type === 'Add') {
        const newEmployee: Employee = {
          id: String(++this.employeesLen),
          firstName: this.loginForm.value.firstName,
          lastName: this.loginForm.value.lastName,
          departmentName: this.loginForm.value.departmentName,
          dateOfJoining: this.loginForm.value.dateOfJoining,
          username: this.loginForm.value.username
        }
        this.store.dispatch(employeeActions.addEmployee({ data: newEmployee }));
        this.empSer.openSnackBar1('Added Successfully !!', 1000, 'success');
      } else if (this.type === 'Edit') {
        this.store.dispatch(employeeActions.updateEmployee({
          data: {
            id: this.employeeData.username,
            changes: {
              firstName: this.loginForm.value.firstName,
              lastName: this.loginForm.value.lastName,
              departmentName: this.loginForm.value.departmentName,
              dateOfJoining: this.loginForm.value.dateOfJoining,
              username: this.loginForm.value.username
            }
          }
        }));
        this.empSer.openSnackBar1('Updated Successfully !!', 1000, 'success');
      }
      this.empSer.editAction.next('');
      this.cancel();
    }
  }

  cancel() {
    this.submitted = false;
    this.loading = false;
    this.loginForm.reset();
    this.editEmployee = false;
  }

  save() {
    console.log('new form data', this.loginForm.value);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5 * 1000,
    });
  }
}
