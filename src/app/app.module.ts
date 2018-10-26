import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { CurrentOrderComponent } from './current-order/current-order.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminMiscComponent } from './admin-misc/admin-misc.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProductComponent,
    CurrentOrderComponent,
    NewOrderComponent,
    OrderHistoryComponent,
    AdminProductComponent,
    AdminMiscComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
