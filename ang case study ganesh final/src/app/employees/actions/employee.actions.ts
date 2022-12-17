import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Employee } from "../store/employee.store";

export enum EmployeeActionTypes {
    Load = '[Employee] Load',
    LoadSuccess = '[Employee] Load Success',
    LoadFailure = '[Employee] Load Failure',
    DeleteEmployee = '[Employee] Delete',
    AddEmployee = '[Employee] Add',
    UpdateEmployee = '[Employee] Update'
}

export const loadEmployees = createAction(EmployeeActionTypes.Load);

export const loadEmployeesSuccess = createAction(
    EmployeeActionTypes.LoadSuccess,
    props<{data: Employee[]}>()
);

export const loadEmployeesFailure = createAction(
    EmployeeActionTypes.LoadFailure,
    props<{error: Error}>()
);

export const deleteEmployee = createAction(
    EmployeeActionTypes.DeleteEmployee,
    props<{data: string}>()
);

export const addEmployee = createAction(
    EmployeeActionTypes.AddEmployee,
    props<{data: Employee}>()
);

export const updateEmployee = createAction(
    EmployeeActionTypes.UpdateEmployee,
    props<{data: Update<Employee>}>()
);

export const employeeActions = {
    loadEmployees,
    loadEmployeesSuccess,
    loadEmployeesFailure,
    deleteEmployee,
    addEmployee,
    updateEmployee
}
