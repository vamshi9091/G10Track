import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './auth/tokeninterceptor/token.interceptor';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    HomeFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  bootstrap: [AppComponent]
})
export class AppModule { }
