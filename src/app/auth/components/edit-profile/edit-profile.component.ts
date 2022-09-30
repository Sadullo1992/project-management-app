import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup, Validators
 } from '@angular/forms';
import { Token } from '../../model/model';
import { AuthService } from '../../services/auth.service';
import { passwordValidator } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, passwordValidator]]
  });

  @ViewChild('confirm') confirm: ElementRef<HTMLElement> | null = null;

  constructor(private authService: AuthService, private location: Location, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onUpdate() {
    this.authService.updateUserProfile(this.editProfileForm.value)
      .subscribe(() => {
        this.authService.login({login: this.editProfileForm.value.login, password: this.editProfileForm.value.password})
          .subscribe((res: Token) => {
            localStorage.removeItem('token');
            localStorage.setItem('token', res.token);
            this.reloadWindow();
            this.location.back();
          });
      });
  }

  deleteProfile() {
    this.authService.deleteUserProfile().subscribe();
    this.authService.logoutUser();
  }

  cancel() {
    this.location.back();
  }

  showConfirmModal() {
    this.confirm?.nativeElement.classList.add('modal__conatiner--active');
  }
  cancelConfirmation() {
    this.confirm?.nativeElement.classList.remove('modal__conatiner--active');
  }

  reloadWindow() {
    window.location.reload();
  }

}
