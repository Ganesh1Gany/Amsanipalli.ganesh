import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from './models/employee';
import { EmployeeService } from './services/employee.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ang_case_study';
  showLogout = false;
  currentUser: User = {
    username: ''
  };
  logoPath = "../assets/images/fislogo.jpg";

  constructor(private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private empSer: EmployeeService,
    private loginSer: LoginService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.translate.addLangs(['en', 'de', 'fe']);
    this.translate.setDefaultLang('en');
    this.empSer.showLogout.subscribe(e => {
      this.showLogout = e;
      this.changeDetectorRef.detectChanges();
    });
    this.loginSer.loggedIn.subscribe(e => {
      this.currentUser = e;
    });
  }

  ngOninit() {
    this.empSer.getEmployeeList().subscribe(e => {
      console.log('e >>>', e);
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.loginSer.loggedIn.next({});
  }

  public switchLanguage(language: string) {
    this.translate.use(language);
  }
}
