import { HttpErrorResponse } from '@angular/common/http';
import { RequestActionState } from '../enums/RequestActionState';

export interface RequestStatus {
  state: RequestActionState;
  isInProgress?: boolean;
  response?: object;
  errorResponse?: HttpErrorResponse;
}
