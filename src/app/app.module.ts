import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Routes
import { LoginComponent } from './routes/login/login.component';
import { UsersComponent } from './routes/users/users.component';
import { SignupComponent } from './routes/signup/signup.component';
import { LogoutComponent } from './routes/logout/logout.component';

// Guards
import { LoggedinGuard } from './shared/guards/loggedin.guard';

// Components
import { NavbarComponent } from './shared/components/navbar/navbar/navbar.component';

// Archivos de configuración
import { AppSettingsService } from './shared/services/app-settings/app-settings.service';

// Traducciones
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function initializeApp(appSettingsService: AppSettingsService) {
  return () => appSettingsService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    SignupComponent,
    LogoutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    LoggedinGuard,
    AppSettingsService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppSettingsService], multi: true
        },
        
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
