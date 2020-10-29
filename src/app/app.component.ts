import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Hiking Around Romania';
  constructor(public translate: TranslateService, public _authService: AuthenticationService, private elementRef: ElementRef) {
    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ro/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout();
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#323232';
 }

}
