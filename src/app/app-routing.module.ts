import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Accounts/login/login.component';
import { UserRegisterComponent } from './Accounts/user-register/user-register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhotoRegisterComponent } from './Accounts/photo-register/photo-register.component';
import { RegisterComponent } from './Accounts/register/register.component';
import { ProfileComponent } from './Accounts/profile/profile.component';

const routes: Routes = [


  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'userRegister', component: UserRegisterComponent },
  { path: 'PhotersRegister', component: PhotoRegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
