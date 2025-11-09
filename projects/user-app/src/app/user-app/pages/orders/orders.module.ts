import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-failed', component: PaymentFailedComponent },
  { path: ':id', component: OrderDetailsComponent },
  
];

@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent, PaymentSuccessComponent, PaymentFailedComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class OrdersModule {}
