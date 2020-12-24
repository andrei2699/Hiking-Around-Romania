import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(public translate: TranslateService,
    public shoppingCartService: ShoppingCartService,
    public authService: AuthenticationService,
    public router: Router,
    private _elementRef: ElementRef) {

    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ro/) ? browserLang : 'en');

    router.events.subscribe(() => {
      this.shoppingCartPreviewIsOpen = false;
    })
  }

  ngOnInit(): void {
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
}
