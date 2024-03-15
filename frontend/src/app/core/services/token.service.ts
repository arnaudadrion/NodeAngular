import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private _isLogged$ = new BehaviorSubject<boolean>(this.getToken() ? true : false);

    get isLogged$(): Observable<boolean> {
        return this._isLogged$.asObservable();
    }

    private setIsLoggedStatus(isLogged: boolean) {
        this._isLogged$.next(isLogged);
    }

    saveToken(token:string): void {
        localStorage.setItem('token', token);
        this.setIsLoggedStatus(true);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    clearToken(): void {
        localStorage.removeItem('token');
        this.setIsLoggedStatus(false);
    }
}