import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/services/auth.service';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
    LoginComponent
  ], 
  providers: [
    AuthService
  ]
})
export class AuthModule { }
