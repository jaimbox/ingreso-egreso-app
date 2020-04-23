import { createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as ingresoEgresosActions from './ingreso-egreso.actions';

export interface State {
  items: IngresoEgreso[];
}

export const initialState: State = {
  items: []
};

export const _ingresoEgresoReducerReducer = createReducer(initialState,
  on(ingresoEgresosActions.setItems, (state, { items }) => ({...state, items: [...items]})),
  on(ingresoEgresosActions.unSetItems, state => ({...state, items: []})),
);

export function ingresoEgresoReducer(state, action) {
  return _ingresoEgresoReducerReducer(state, action);
}
