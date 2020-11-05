import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { EventOrganizerProfileComponent } from './profile/event-organizer-profile/event-organizer-profile.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartPageComponent } from './shopping-cart-page/shopping-cart-page.component';
import { AboutUsComponent } from './about-us/about-us.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'event-organizer-profile/:userId', component: EventOrganizerProfileComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'shopping-cart', component: ShoppingCartPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  // canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
