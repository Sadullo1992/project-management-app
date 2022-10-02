import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConnectableObservable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('navMenu') navMenu: ElementRef | null = null;

  isChecked = false;
  seachVisibility = false;


  constructor(private authService: AuthService, public translateService: TranslateService, private router: Router) {
    translateService.addLangs(['en', 'ru']);
    translateService.setDefaultLang('en');

    const browserLang = translateService.getBrowserLang();
    translateService.use(browserLang?.match(/en|ru/) ? browserLang : 'en');

   }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(this.router.url.includes('boards')) {
          this.seachVisibility = true;
        } else {
          this.seachVisibility = false;
        }
      }
    })
  }

  isUserLogin = () => {
    return this.authService.loggedIn();
  }

  openCloseMenu() {
    if(this.navMenu?.nativeElement.classList.contains('nav--active')) {
      this.navMenu?.nativeElement.classList.remove('nav--active');
    } else {
      this.navMenu?.nativeElement.classList.add('nav--active');
    }
  }

  public setLanguage() {
    if(this.isChecked) {
      this.translateService.use('ru');
    } else {
      this.translateService.use('en');
    }
  }

}
