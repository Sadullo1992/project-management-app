import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from '../../model/model';
import { AuthService } from '../../services/auth.service';

declare let alertify: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required]]
  });

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onLogin(ngForm: FormGroupDirective) {
    this.authService.login(this.loginForm.value)
      .subscribe((res: Token) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/boards']);
        alertify.set('notifier','position', 'top-right');
        alertify.success('You are successfully authorized!');
      });

    this.loginForm.reset();
    ngForm.resetForm();
  }


}

export function passwordValidator(control: AbstractControl): ValidationErrors | null  {
  if(control.value === "") return null;
  if(control.value === null) return null;
  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if(!passwordRegex.test(control.value)) {
    return { 'passwordInvalid': true}
  }
  return null;
}
