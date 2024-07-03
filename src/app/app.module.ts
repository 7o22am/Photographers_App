import { NgModule   } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Accounts/login/login.component';
import { UserRegisterComponent } from './Accounts/user-register/user-register.component';
import { PhotoRegisterComponent } from './Accounts/photo-register/photo-register.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './Accounts/register/register.component';
import { FilterComponent } from './filter/filter.component';
import { ProfileComponent } from './Accounts/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmEmailComponent } from './Accounts/confirm-email/confirm-email.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestComponent } from './guest/guest.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OrderComponent } from './order/order.component';
import { SearchComponent } from './search/search.component';
 
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserRegisterComponent,
    PhotoRegisterComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    RegisterComponent,
    FilterComponent,
    ProfileComponent,
    ConfirmEmailComponent,
    PrivacyComponent,
    GuestComponent,
    ContactUsComponent,
    OrderComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,    
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SocialLoginModule,
 
  ],

  providers: [ {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('772735305148-v1ejbmcebdqvh3pemasotb16hn6n9clj.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
