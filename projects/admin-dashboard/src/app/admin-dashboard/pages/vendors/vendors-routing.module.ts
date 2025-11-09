import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsListComponent } from './vendors-list/vendors-list.component';
import { VendorProductsComponent } from './vendor-products/vendor-products.component';

const routes: Routes = [
  { path: '', component: VendorsListComponent },
  { path: ':id/products', component: VendorProductsComponent } // admin view of a vendor's products
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsRoutingModule {}
