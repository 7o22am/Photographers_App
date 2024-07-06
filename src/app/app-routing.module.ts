import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Accounts/login/login.component';
import { UserRegisterComponent } from './Accounts/user-register/user-register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhotoRegisterComponent } from './Accounts/photo-register/photo-register.component';
import { RegisterComponent } from './Accounts/register/register.component';
import { ProfileComponent } from './Accounts/profile/profile.component';
import { ConfirmEmailComponent } from './Accounts/confirm-email/confirm-email.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { GardGuard } from './gard.guard';
import { GuestComponent } from './guest/guest.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OrderComponent } from './order/order.component';
import { SearchComponent } from './search/search.component';
import { PaymentComponent } from './payment/payment.component';
import { ResetPasswordComponent } from './Accounts/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Accounts/forgot-password/forgot-password.component';
 
const routes: Routes = [


  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'userRegister', component: UserRegisterComponent },
  { path: 'PhotersRegister', component: PhotoRegisterComponent },
  { path: 'Contact-Us', component: ContactUsComponent },
  { path: 'profile', component: ProfileComponent ,canActivate:[GardGuard] },
  { path: 'order/:id', component: OrderComponent ,canActivate:[GardGuard] },
  { path: 'guest/:id', component: GuestComponent },
  { path: 'ConfirmEmail', component: ConfirmEmailComponent },
  { path: 'Search', component: SearchComponent, pathMatch: 'full' },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'CompletePay/:amount/:id', component: PaymentComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
