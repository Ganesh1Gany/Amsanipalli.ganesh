import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';

import { EmployeesSummaryComponent } from './employees-summary.component';

describe('EmployeesSummaryComponent', () => {
  let component: EmployeesSummaryComponent;
  let fixture: ComponentFixture<EmployeesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, MatSnackBarModule, StoreModule.forRoot({}) ],
      declarations: [ EmployeesSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
