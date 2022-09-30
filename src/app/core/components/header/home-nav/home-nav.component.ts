import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/core/services/nav.service';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {
  constructor(private navService: NavService) {}

  ngOnInit(): void {
  }

  closeNav() {
    this.navService.closeNavMenu();
  }

}
