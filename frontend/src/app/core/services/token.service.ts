import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import moment from "moment";
import { AppUserService } from "./app-user.service";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private _isLogged$ = new BehaviorSubject<boolean>(this.getToken() && this.isExpired() ? true : false);

    constructor(private appUserService: AppUserService) {}

    get isLogged$(): Observable<boolean> {
        return this._isLogged$.asObservable();
    }

    private setIsLoggedStatus(isLogged: boolean) {
        this._isLogged$.next(isLogged);
    }

    saveToken(token:string, expiresIn: string): void {
        const expiresAt = moment().add(expiresIn,'second');
        localStorage.setItem('token', token);
        localStorage.setItem('expiredAt', JSON.stringify(expiresAt.valueOf()));
        this.setIsLoggedStatus(true);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getExpiration() {
        const expiration = localStorage.getItem('expiredAt') ?? '';
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }  

    isExpired() {
        const isExpired = moment().isAfter(this.getExpiration());

        if(isExpired) {
            this.clearToken();
        }

        return isExpired;
    }

    clearToken(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('expiredAt');
        localStorage.removeItem('user');
        this.setIsLoggedStatus(false);
    }
}