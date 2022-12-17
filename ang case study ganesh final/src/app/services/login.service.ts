import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginCred = [];
  public loggedIn = new Subject<any>();

  constructor() { }

  setLogin(user: any) {
    if(user) {
      this.loginCred = user;
      this.loggedIn.next(this.loginCred[0]);
    }
  }

  getLogin() {
    return this.loginCred;
  }
}
