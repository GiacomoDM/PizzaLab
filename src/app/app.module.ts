import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';

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
import { OrdersToDeliverComponent } from './orders-to-deliver/orders-to-deliver.component';
import { DragulaModule } from 'ng2-dragula';

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
    OrdersToDeliverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OrderModule,
    FilterPipeModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
