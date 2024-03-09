import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, map, startWith, tap } from 'rxjs';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
    
  }
  
}
