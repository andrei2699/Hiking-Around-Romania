import { AfterViewInit, Component, ElementRef } from '@angular/core';
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
  constructor(public translate: TranslateService, public _authService: AuthenticationService, private elementRef: ElementRef,private _router: Router) {
    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ro/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout().then(() => {
      this._router.navigate(['/login']);
    }).catch(error => {
      console.log(error);
    });;
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#323232';
    this.elementRef.nativeElement.ownerDocument.body.style.margin = '0';
  }

}
