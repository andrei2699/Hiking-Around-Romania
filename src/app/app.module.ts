import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GoogleMapsModule } from '@angular/google-maps';

import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';


import * as firebase from 'firebase';
import { AuthenticationService } from './authentication.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { EventOrganizerProfileComponent } from './profile/event-organizer-profile/event-organizer-profile.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { HomeComponent } from './home/home.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { ShoppingCartPageComponent } from './shopping-cart-page/shopping-cart-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { PhotoArrayComponent } from './photo-array/photo-array.component';

firebase.initializeApp(environment.firebase);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventOrganizerProfileComponent,
    CreateEventComponent,
    HomeComponent,
    ConfirmationDialogComponent,
    ShoppingCartPageComponent,
    AboutUsComponent,
    EventDetailsComponent,
    PhotoArrayComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    GoogleMapsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
  ],
  providers: [
    AuthenticationService,
    // { provide: REGION, useValue: 'europe-west1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
