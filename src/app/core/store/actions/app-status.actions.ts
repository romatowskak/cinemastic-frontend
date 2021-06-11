import { createAction } from '@ngrx/store';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_FINISHED = 'REQUEST_FINISHED';

export const actionStarted = createAction(REQUEST_STARTED);

export const actionFinished = createAction(REQUEST_FINISHED);
