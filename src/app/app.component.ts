import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Hiking Around Romania';

  constructor(public translate: TranslateService,
    public authService: AuthenticationService,
    public router: Router,
    private _elementRef: ElementRef) {
    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ro/) ? browserLang : 'en');
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

  ngAfterViewInit() {
    this._elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#323232';
    this._elementRef.nativeElement.ownerDocument.body.style.margin = '0';
  }

  goToProfile() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.router.navigate(['/event-organizer-profile', userId]);
    }
  }
}
