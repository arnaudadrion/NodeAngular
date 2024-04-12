import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, map, startWith, tap } from 'rxjs';
import { confirmEqualValidator } from '../../../core/validators/confirm-equal.validator';
import { AuthService } from '../../../core/services/auth.service';
import { ICredential } from '../../../core/interfaces/credential.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  mainForm!: FormGroup;

  choiceFormCtrl!: FormControl;

  loginForm!: FormGroup;
  loginEmailCtrl!: FormControl;
  loginPasswordCtrl!: FormControl;

  signUpForm!: FormGroup;

  firstnameCtrl!: FormControl;
  lastnameCtrl!: FormControl;

  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  emailForm!: FormGroup;

  showLoginForm$!: Observable<boolean>;
  showSignupForm$!: Observable<boolean>;

  showMailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  loading = false;
  // returnUrl!: string
  
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  initFormControls() {
    this.choiceFormCtrl = new FormControl('login');

    this.loginEmailCtrl = new FormControl('');
    this.loginPasswordCtrl = new FormControl('');
    this.loginForm = new FormGroup({
      loginEmail: this.loginEmailCtrl,
      loginPassword: this.loginPasswordCtrl
    });

    this.firstnameCtrl = new FormControl('');
    this.lastnameCtrl = new FormControl('');

    this.emailCtrl = new FormControl('');
    this.passwordCtrl = new FormControl('');
    this.confirmPasswordCtrl = new FormControl('');
    this.emailForm = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    });

    this.signUpForm = new FormGroup({
      firstname: this.firstnameCtrl,
      lastname: this.lastnameCtrl,
      emailForm: this.emailForm
    });
  }

  initMainForm() {
    this.mainForm = new FormGroup({
      choiceForm: this.choiceFormCtrl,
      loginForm: this.loginForm,
      signUpForm: this.signUpForm
    })
  }

  initFormObservables() {
    this.showLoginForm$ = this.choiceFormCtrl.valueChanges.pipe(
      startWith(this.choiceFormCtrl.value),
      map(preference => preference === 'login'),
      tap(showLoginForm => this.loginValidators(showLoginForm))
    );
    this.showSignupForm$ = this.choiceFormCtrl.valueChanges.pipe(
      startWith(this.choiceFormCtrl.value),
      map(preference => preference === 'signup'),
      tap(showSignupForm => this.signupValidators(showSignupForm))
    );

    this.showPasswordError$ = this.emailForm.statusChanges.pipe(
      map(status => status === 'INVALID' &&
        this.passwordCtrl.value &&
        this.confirmPasswordCtrl.value &&
        this.emailForm.hasError('confirmEqual')
      )
    );
  }

  getFormControlErrorText(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'Ce champ est requis';
    } else if (control.hasError('email')) {
      return 'Merci d\'entrer une adresse mail valide';
    } else {
      return 'Ce champ contient une erreur';
    }
  }

  private loginValidators(shomLoginForm: boolean) {
    if (shomLoginForm) {
      this.loginEmailCtrl.addValidators([
        Validators.required,
        Validators.email
      ]);
      
      this.loginPasswordCtrl.addValidators([Validators.required]);
    } else {
      this.loginEmailCtrl.clearValidators();
      this.loginPasswordCtrl.clearValidators();;
    }
    this.loginEmailCtrl.updateValueAndValidity();
    this.loginPasswordCtrl.updateValueAndValidity();  
  }

  private signupValidators(showSignupForm: boolean) {
    if (showSignupForm) {
      this.firstnameCtrl.addValidators([Validators.required]);
      this.lastnameCtrl.addValidators([Validators.required]);
      this.emailCtrl.addValidators([
        Validators.required,
        Validators.email
      ]);
      
      this.passwordCtrl.addValidators([Validators.required]);
      this.confirmPasswordCtrl.addValidators([Validators.required]);
    } else {
      this.firstnameCtrl.clearValidators();
      this.lastnameCtrl.clearValidators();
      this.emailCtrl.clearValidators();
      this.passwordCtrl.clearValidators();
      this.confirmPasswordCtrl.clearValidators();
    }
    this.firstnameCtrl.updateValueAndValidity();
    this.lastnameCtrl.updateValueAndValidity();
    this.emailCtrl.updateValueAndValidity();
    this.passwordCtrl.updateValueAndValidity();
    this.confirmPasswordCtrl.updateValueAndValidity();  
  }

  onSubmitForm() {
    if (this.mainForm.value.choiceForm === 'login') {
      this.loading = true;

      const credentials: ICredential = {
        email: this.loginForm.value.loginEmail,
        password: this.loginForm.value.loginPassword
      }
      
      this.authService.logUser(credentials).pipe(
        tap(logged => {
          this.loading = false;
          if (logged) {
            this.resetForm();
            this.route.queryParamMap.subscribe(params => {
              const returnUrl = params.get('returnUrl');
              if(returnUrl) {
                this.router.navigateByUrl(returnUrl);
              } else {
                this.router.navigateByUrl('/');
              }
            });
            
          } else {
            this.snackbarService.openSnackBar('Echec de login', 'OK');
          }
      })
      ).subscribe();
    } else {
      this.loading = true;
      const data = {
        firstname: this.signUpForm.value.firstname,
        lastname: this.signUpForm.value.lastname,
        email: this.emailForm.value.email,
        password: this.emailForm.value.password
      }
      this.authService.saveUserInfo(data).pipe(
          tap(saved => {
              this.loading = false;
              if (saved) {
                this.resetForm();
              } else {
                this.snackbarService.openSnackBar('Echec de l\'enregistrement', 'OK');
              }
          })
        ).subscribe();
    }
  }

  private resetForm() {
    this.mainForm.reset();
    this.choiceFormCtrl.patchValue('login');
  }
}
