import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdminProductComponent } from './admin-product/admin-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'newOrder', component: NewOrderComponent},
  { path: 'orders', component: OrderHistoryComponent},
  { path: 'admin/products', component: AdminProductComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
