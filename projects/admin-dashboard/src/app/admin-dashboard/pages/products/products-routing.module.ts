import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

// const routes: Routes = [{ path: '', component: ProductsComponent }];

const routes: Routes = [
  { path: '', component: ProductsListComponent, data: { breadcrumb: 'Products' } },
  { path: 'new', component: ProductFormComponent, data: { breadcrumb: 'Add Product' } },
  { path: 'edit/:id', component: ProductFormComponent, data: { breadcrumb: 'Edit Product' } }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
