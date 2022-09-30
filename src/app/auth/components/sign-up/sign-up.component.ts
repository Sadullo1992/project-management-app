import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';

import { Token } from '../../model/model';
import { AuthService } from '../../services/auth.service';
import { passwordValidator } from '../sign-in/sign-in.component';

declare let alertify: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, passwordValidator]]
  });

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  onSignUp(ngForm: FormGroupDirective) {
    this.authService.singUp(this.signUpForm.value)
      .subscribe(() => {
        this.authService.login({login: this.signUpForm.value.login, password: this.signUpForm.value.password})
          .subscribe((res: Token) => {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/boards']);
            alertify.set('notifier','position', 'top-right');
            alertify.success('You are successfully authorized!');
          });
      });

      this.signUpForm.reset();
      ngForm.resetForm();
  }

}
