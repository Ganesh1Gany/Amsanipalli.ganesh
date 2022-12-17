import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { _REDUCER_FACTORY } from "@ngrx/store/src/tokens";
import { employeeActions } from "../actions/employee.actions";
import { Employee } from "../store/employee.store";

export const employeeFeatureKey = 'employee';

// 1. Define State i.e. What it will contain
export interface EmployeeState extends EntityState<Employee> {
    // Books: Book[] -> This is not needed as it's provided by parent class from @ngrx/entity
    loaded: boolean;
    error?: Error
}

// 2. Since we need CRUD, we will use Entity Adapter
export const employeeAdapter: EntityAdapter<Employee> = createEntityAdapter<Employee>({
    selectId: (employee) => employee.username // employee.id
});

// 3. Define how we want to store our State, it's partial, becaus there could be other states for other parts of App
export interface BookPartialState {
    readonly [employeeFeatureKey]: EmployeeState;
}

// 4. Define Initial State
export const employeeInitialState: EmployeeState = employeeAdapter.getInitialState({
    loaded: false,
    error: null as any
});

// 5. Defne Reducer, like a switch cse we saw, but this is more organized!
const _employeeReducer = createReducer(
    employeeInitialState,
    on(employeeActions.loadEmployeesSuccess, (state, { data }) => {
      return employeeAdapter.addMany(data, {
          ...state,
          loaded: true
      })
    }),
    on(employeeActions.loadEmployeesFailure, (state, { error }) => {
        return {
            ...state,
            error
        }
    }),
    on(employeeActions.deleteEmployee, (state, { data }) => {
        return employeeAdapter.removeOne(data, {
            ...state,
            loaded: true
        })
    }),
    on(employeeActions.addEmployee, (state, { data }) => {
        return employeeAdapter.addOne(data, {
            ...state,
            loaded: true
        })
    }),
    on(employeeActions.updateEmployee, (state, { data }) => {
        return employeeAdapter.updateOne(data, {
            ...state,
            loaded: true
        })
    })
);

export function employeeReducer(state: EmployeeState | undefined, action: Action) {
    return _employeeReducer(state, action);
}
