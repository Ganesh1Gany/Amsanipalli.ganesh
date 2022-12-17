import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EmployeesSummaryComponent } from './employees/employees-summary/employees-summary.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginUserComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard],
    children: [
      { path: 'employee-list', component: EmployeesListComponent, canActivate: [AuthGuard] },
      { path: 'employee-summary', component: EmployeesSummaryComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
