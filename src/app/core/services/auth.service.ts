import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public signIn(userName: string, password: string): Observable<User> {
    const userCredentials = { identifier: userName, password };
    return this.httpClient.post<User>(`${environment.apiUrl}/auth/local`, userCredentials);
  }
}
