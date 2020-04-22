import { createAction, props } from '@ngrx/store';

export const isLoading = createAction('[Ui] Is Loading');

export const stopLoading = createAction('[Ui] Stop Loading');
