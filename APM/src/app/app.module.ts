import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { ParentRouteModule } from './routing/parent-route/parent-route.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule,
    ParentRouteModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent
    ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }