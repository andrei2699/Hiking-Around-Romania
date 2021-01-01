import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './authentication.service';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hiking Around Romania';
  shoppingCartPreviewIsOpen = false;
  isCurrentUserAnOrganizer = true;
  shoppingCartItemsCount = 0;

  constructor(public translate: TranslateService,
    public shoppingCartService: ShoppingCartService,
    public authService: AuthenticationService,
    public router: Router,
    private _cookieService: CookieService) {

    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ro/) ? browserLang : 'en');

    const storedLang = this._cookieService.get('language');
    if (storedLang) {
      this.translate.use(storedLang);
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.shoppingCartPreviewIsOpen = false;

      if (val instanceof NavigationEnd) {
        document.body.classList.remove('login-bg');
        document.body.classList.remove('register-bg');

        if (val.url == '/login') {
          document.body.classList.add('login-bg');
        }
        else if (val.url == '/register') {
          document.body.classList.add('register-bg');
        }
      }
    });

    this.shoppingCartService.getShoppingCartItems().subscribe(items => {
      this.shoppingCartItemsCount = (<Array<any>>items).length;

    })

    this.authService.isCurrentUserOrganizer().subscribe(isOrganizer => {
      this.isCurrentUserAnOrganizer = isOrganizer;
    })
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.log(error);
    });;
  }

  goToProfile() {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.router.navigate(['/event-organizer-profile', userId]);
      }
    });
  }

  changeLanguage(lang) {
    this.translate.use(lang)
    this._cookieService.set('language', lang);
  }
}
