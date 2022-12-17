import { Action } from "@ngrx/store";

export enum CounterActionTypes {
    Incr = '[Counter] Incr',
    Decr = '[Counter] Decr',
    Reset = '[Counter] Reset'
}

export class CounterIncrAction implements Action {
    public readonly type = CounterActionTypes.Incr;
}

export class CounterDecrAction implements Action {
    public readonly type = CounterActionTypes.Decr;
}

export class CounterResetAction implements Action {
    public readonly type = CounterActionTypes.Reset;
}

export type CounterActions = CounterIncrAction | CounterDecrAction | CounterResetAction;
