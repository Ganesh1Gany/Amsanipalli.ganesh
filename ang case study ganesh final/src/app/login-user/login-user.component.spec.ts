import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LoginUserComponent } from './login-user.component';
import { EmployeeService } from '../services/employee.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;
  const obj = {};
  const fakeActivatedRoute = {
    snapshot: { data: { ...obj } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), MatSnackBarModule ],
      declarations: [ LoginUserComponent ],
      providers: [ 
        { provide: FormBuilder},
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        { provide: HttpClient }, { provide: EmployeeService},
        { provide: HttpHandler},
        { provide: TranslateService } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
