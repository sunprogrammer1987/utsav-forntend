import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':serviceType/:categorySlug/:subSlug', component: ProductListComponent } // ✅ show subcategory products
];


@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ProductsRoutingModule { }