import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, delay, catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICredential } from '../../core/interfaces/credential.interface';
import { IToken } from '../../core/interfaces/token.interface';
import { TokenService } from './token.service';
import { AppUserService } from './app-user.service';
import { AppUser } from '../models/app-user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService, 
    private appUserService: AppUserService
  ) {}

  saveUserInfo(data: Object): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/auth/signup`, data).pipe(
      map(() => true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }

  logUser(credential: ICredential): Observable<boolean> {
    return this.http.post<IToken>(`${environment.apiUrl}/auth/login`, credential).pipe(
      tap(response=> {
        this.tokenService.saveToken(`${response.token}`, `${response.expiresIn}`);
        const user = <AppUser>{firstname: `${response.firstname}`, lastname:`${response.lastname}`};
        this.appUserService.saveUser(user);
      }),
      map(() => true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }

  logout() {
    
  }
}