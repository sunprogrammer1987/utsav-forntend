import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './vendor-dashboard/guards/auth.guard';
// import { RoleGuard } from './vendor-dashboard/guards/role.guard'; // ✅ Use local RoleGuard
import { LayoutComponent } from './vendor-dashboard/components/layout/layout.component';
console.log("routes");
 
const routes: Routes = [
  // 🔹 Auth (Login, Register)
  {
    path: 'auth',
    loadChildren: () =>
      import('./vendor-dashboard/pages/auth/auth.module').then(m => m.AuthModule)
  },

  // 🔹 Vendor Dashboard (Home)
  {
    path: '',
    component: LayoutComponent, // ✅ shared layout (sidebar, topbar, etc.)
    // canActivate: [AuthGuard, RoleGuard],
    canActivate: [AuthGuard],
    data: { roles: ['vendor'] },
    children: [
      { path: '', loadChildren: () => import('./vendor-dashboard/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'products', loadChildren: () => import('./vendor-dashboard/pages/products/products.module').then(m => m.ProductsModule) },
      { path: 'categories', loadChildren: () => import('./vendor-dashboard/pages/categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'orders', loadChildren: () => import('./vendor-dashboard/pages/orders/orders.module').then(m => m.OrdersModule) },
      { path: 'stores', loadChildren: () => import('./vendor-dashboard/pages/stores/stores.module').then(m => m.StoresModule) },
      { path: 'profile',loadChildren: () => import('./vendor-dashboard/pages/profile/profile.module').then(m => m.ProfileModule)},
      { path: 'events', loadChildren: () => import('./vendor-dashboard/pages/events/events.module').then(m => m.EventsModule)}

    ]
  },
  { path: 'events', loadChildren: () => import('./vendor-dashboard/pages/events/events.module').then(m => m.EventsModule) },
  // 🔹 Wildcard
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
