import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminMiscComponent } from './admin-misc/admin-misc.component';
import { OrdersToDeliverComponent } from './orders-to-deliver/orders-to-deliver.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'newOrder', component: NewOrderComponent},
  { path: 'orders', component: OrderHistoryComponent},
  { path: 'admin/products', component: AdminProductComponent},
  { path: 'admin/misc', component: AdminMiscComponent},
  { path: 'delivery', component: OrdersToDeliverComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
