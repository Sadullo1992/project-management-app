import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/model/model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavService } from 'src/app/core/services/nav.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {
  currentUserData: User = {
    id: '',
    login: '',
    name: ''
  }

  constructor(private authService: AuthService, private navService: NavService) {}

  ngOnInit(): void {
    this.getCurrentUserData();
  }

  getCurrentUserData() {
    this.authService.getUserDataWithToken().subscribe((res) => {
      this.currentUserData = { ...res };
    })
  }

  logoutUser() {
    this.authService.logoutUser();
    this.navService.closeNavMenu();
  }

  closeNav() {
    this.navService.closeNavMenu();
  }

}
