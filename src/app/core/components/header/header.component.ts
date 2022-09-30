import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('navMenu') navMenu: ElementRef | null = null;

  isChecked = false;


  constructor(private authService: AuthService, public translateService: TranslateService) {
    translateService.addLangs(['en', 'ru']);
    translateService.setDefaultLang('en');

    const browserLang = translateService.getBrowserLang();
    translateService.use(browserLang?.match(/en|ru/) ? browserLang : 'en');

   }

  ngOnInit(): void {
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
