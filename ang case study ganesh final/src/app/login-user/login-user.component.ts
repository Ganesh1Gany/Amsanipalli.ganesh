import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { LoginService } from '../services/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'login',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error: string = '';
  userNotFound: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private empSer: EmployeeService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.empSer.showLogout.next(false);
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    } else {
      this.empSer.getEmployeeList().subscribe(e => {
        const uname = this.loginForm.value.username;
        const pwd = this.loginForm.value.password;
        const userFound = e.filter((k: any) => uname === k.username && pwd === k.password);
        if(userFound.length) {
          this.loginService.setLogin(userFound);
          this.userNotFound = false;
          this.empSer.openSnackBar1('Logged In Successfully !!', 1000, 'success');
          this.router.navigate(['/home']);
        } else {
          this.userNotFound = true;
        }
      });
    }
  }

  public switchLanguage(language: string) {
    this.translate.use(language);
  }
}