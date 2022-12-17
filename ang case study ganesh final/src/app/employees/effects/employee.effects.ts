import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { employeeActions } from "../actions/employee.actions";
import { EmployeeService } from "../services/employee.service";
import { Employee } from "../store/employee.store";

@Injectable()
export class EmployeeEffects {
    public loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(employeeActions.loadEmployees),
            mergeMap(() =>
                this.bookService.getEmployees().pipe(
                    tap(console.debug),
                    map((res: Employee[]) => employeeActions.loadEmployeesSuccess({ data: res}),
                    catchError(() => of ({type: employeeActions.loadEmployeesFailure}))
                )
            )
        )
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly bookService: EmployeeService
    ) {}
}
