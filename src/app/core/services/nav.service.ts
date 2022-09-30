import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  nav: HTMLElement | null;

  constructor() {
    this.nav = document.querySelector('nav');
  }

  closeNavMenu() {
    if(this.nav?.classList.contains('nav--active')) {
      this.nav?.classList.remove('nav--active');
    }
  }

}
