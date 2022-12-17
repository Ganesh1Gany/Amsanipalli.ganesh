import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public editAction = new Subject<any>();
  public showLogout = new Subject<any>();

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getEmployeeList(): Observable<any> {
    return this.http.get<any> (
      '../../assets/api/employee/employee-list.json'
    );
  }

  scrollToBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  }

  openSnackBar1(msg: any, timeout: any, resType: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: msg,
      duration: timeout,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['bgClr']
    });
  }
}
