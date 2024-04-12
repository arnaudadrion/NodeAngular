import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AppUser } from "../models/app-user.model";

@Injectable({
    providedIn: 'root'
})
export class AppUserService {
    private _user$ = new BehaviorSubject<AppUser>(this.getUserFromStorage());

    get user$(): Observable<AppUser> {
        return this._user$.asObservable();
    }

    private setUser(user: AppUser) {
        this._user$.next(user);
    }

    saveUser(user: AppUser): void {
        localStorage.setItem('user', JSON.stringify(user));
        this.setUser(user);
    }

    getUserFromStorage(): AppUser {
        const user = localStorage.getItem('user');
        return user ? <AppUser>JSON.parse(user) : <AppUser>{firstname: '', lastname: ''};
    }

    removeUser(): void {
        localStorage.removeItem("user");
        this.setUser({firstname: '', lastname: ''});
    }
}