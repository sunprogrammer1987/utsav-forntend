import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './category-page/category-page.component';
import { SharedModule } from '../../shared.module';


@NgModule({
  declarations: [CategoriesComponent],  // ✅ FIXED
  imports: [
    CommonModule,
    RouterModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule {}
