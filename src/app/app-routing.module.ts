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
 
const routes: Routes = [


  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'userRegister', component: UserRegisterComponent },
  { path: 'PhotersRegister', component: PhotoRegisterComponent },
  { path: 'profile/:id', component: ProfileComponent ,canActivate:[GardGuard] },
  { path: 'ConfirmEmail', component: ConfirmEmailComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
