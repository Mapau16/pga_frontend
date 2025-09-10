import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { apiInterceptor } from './shared/interceptors/api.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule], providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([apiInterceptor, errorInterceptor])),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
