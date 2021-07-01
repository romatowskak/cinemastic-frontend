import { Action, createAction, props } from '@ngrx/store';

export const SHOW_SNACK_BAR = 'SHOW_SNACK_BAR';

export const showSnackBar = createAction(
  SHOW_SNACK_BAR,
  props<{
    payload: {
      message: string;
    };
  }>()
);
