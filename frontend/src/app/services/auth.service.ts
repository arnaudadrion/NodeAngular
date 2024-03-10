import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, delay, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token!: string;

  constructor(private http: HttpClient) {}

  saveUserInfo(formValue: User): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/auth/signup`, formValue).pipe(
      map(() => true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }

  logUser(data: Object): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data).pipe(
      map(() => true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }

  getToken(): string {
    return this.token;
  }
}