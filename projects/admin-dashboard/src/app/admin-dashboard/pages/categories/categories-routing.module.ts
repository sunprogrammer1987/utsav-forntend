import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryTreeComponent } from './category-tree/category-tree.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent},
  { path: 'tree', component: CategoryTreeComponent, data: { breadcrumb: 'Tree View' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
