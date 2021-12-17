import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

enum Language {
  ka = 'ka',
  en = 'en',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //isNavbarOpen: boolean = false;

  get isKa(): boolean {
    return this.translateService.currentLang === 'ka';
  }

  get isEn(): boolean {
    return this.translateService.currentLang === 'en';
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  constructor(
    private auth: AuthService,
    private translateService: TranslateService,
    private router: Router
  ) {
    let currLang: string = localStorage.getItem('lang');
    if (!currLang || !(currLang in Language)) {
      currLang = translateService.defaultLang;
    }
    if (currLang !== translateService.currentLang) {
      this.changeLang(currLang);
    }
  }

  ngOnInit() {}

  // toggleNavbar() {
  //   this.isNavbarOpen = !this.isNavbarOpen;
  // }

  changeLang(lang: string) {
    if (lang === this.translateService.currentLang) return;
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
  }

  goToSigIn() {
    this.router.navigate(['sign-in']);
  }

  goToSigUp() {
    this.router.navigate(['sign-up']);
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['sign-in']);
    });
  }

  goToAdd() {
    this.router.navigate(['content/add']);
  }
}
