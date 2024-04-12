import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { AppUser } from '../../models/app-user.model';
import { AppUserService } from '../../services/app-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLogged$!: Observable<boolean>;

  appUser$!: Observable<AppUser>;

  constructor(private tokenService: TokenService, private appUserService: AppUserService) {}

  ngOnInit() {
    this.isLogged$ = this.tokenService.isLogged$;
    this.appUser$ = this.appUserService.user$;
  }

  logout() {
    this.tokenService.clearToken();
    this.appUserService.removeUser();
  }
}
