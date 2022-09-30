import { Injectable, OnInit } from '@angular/core';
import { LoginUserData, SignUpUserData, Token, User } from '../model/model';
import { JwtHelperService } from "@auth0/angular-jwt";

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private helper = new JwtHelperService();

  userId = '';

  users: User[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    this.getDataFromStore();
  }

  ngOnInit(): void {
  }

  getDataFromStore() {
    if(!!localStorage.getItem('token')) {
      const token = this.getToken() as string;
      const decodedToken = this.helper.decodeToken(token);
      this.userId = decodedToken.userId;
    }
  }

  singUp(user: SignUpUserData): Observable<User> {
    return this.apiService.singUp(user);
  }

  login(user: LoginUserData): Observable<Token> {
    return this.apiService.login(user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    alertify.set('notifier','position', 'top-right');
    alertify.success('You are successfully logged out!');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserDataWithToken() {
    this.getDataFromStore();
    return this.apiService.getUser(this.userId);
  }

  deleteUserProfile() {
    this.getDataFromStore();
    return this.apiService.deleteUser(this.userId);
  }

  updateUserProfile(user: SignUpUserData) {
    this.getDataFromStore();
    return this.apiService.updateUser(user, this.userId);
  }
}
