import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mainForm!: FormGroup;

  firstnameCtrl!: FormControl;
  lastnameCtrl!: FormControl;

  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  emailForm!: FormGroup;

  showMailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  loading = false;

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  initFormControls() {
    this.firstnameCtrl = new FormControl('', Validators.required);
    this.lastnameCtrl = new FormControl('', Validators.required);

    this.emailCtrl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordCtrl = new FormControl('', Validators.required);
    this.confirmPasswordCtrl = new FormControl('', Validators.required);
    this.emailForm = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators: [confirmEqualValidator('email', 'confirm')],
      updateOn: 'blur'
    });
  }

  initMainForm() {
    this.mainForm = new FormGroup({
      firstname: this.firstnameCtrl,
      lastname: this.lastnameCtrl,
      email: this.emailForm
    })
  }

  initFormObservables() {

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

  onSubmitForm() {
    
  }
  
}
