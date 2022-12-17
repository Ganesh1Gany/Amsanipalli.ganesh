import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterDecrAction, CounterIncrAction, CounterResetAction } from '../actions/counter.actions';
import { CounterState, counterStoreKey } from '../store/counter.store';

@Component({
  selector: 'app-ngrx-counter',
  templateUrl: './ngrx-counter.component.html',
  styleUrls: ['./ngrx-counter.component.scss']
})
export class NgrxCounterComponent implements OnInit {
  public counter$: Observable<number>;

  constructor(private readonly store: Store<CounterState>) { }

  public ngOnInit(): void {
    this.counter$ = this.store.pipe(select(counterStoreKey));
  }

  public incr() {
    this.store.dispatch(new CounterIncrAction());
  }

  public desc() {
    this.store.dispatch(new CounterDecrAction());
  }

  public reset() {
    this.store.dispatch(new CounterResetAction());
  }
}
