import { CounterActions, CounterActionTypes } from "../actions/counter.actions";

export const initialState = 0;

export function counterReducer (state: any, action: any) {
    switch (action.type) {
        case CounterActionTypes.Incr:
            return state + 1;
        case CounterActionTypes.Decr:
            return state - 1;
        case CounterActionTypes.Reset:
            return 0;
        default:
            return state;
    }
}
