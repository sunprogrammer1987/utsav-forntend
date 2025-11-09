import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';

// const routes: Routes = [{ path: '', component: OrdersComponent }];
const routes: Routes = [
  { path: '', component: OrdersListComponent, data: { breadcrumb: 'Orders' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
