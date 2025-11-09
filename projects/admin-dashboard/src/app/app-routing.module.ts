import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './admin-dashboard/guards/auth.guard';
import { RoleGuard } from './admin-dashboard/guards/role.guard';
import { LayoutComponent } from './admin-dashboard/components/layout/layout.component';

const routes: Routes = [
  // 🔹 Admin Auth (login, forgot-password, etc.)
  {
    path: 'auth',
    loadChildren: () =>
      import('./admin-dashboard/pages/auth/auth.module').then(m => m.AuthModule)
  },

  // 🔹 Protected Admin Area (Layout + all child pages)
  {
    path: '',
    component: LayoutComponent, // ✅ shared layout (sidebar, topbar, etc.)
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', loadChildren: () => import('./admin-dashboard/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'products', loadChildren: () => import('./admin-dashboard/pages/products/products.module').then(m => m.ProductsModule) },
      { path: 'categories', loadChildren: () => import('./admin-dashboard/pages/categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'orders', loadChildren: () => import('./admin-dashboard/pages/orders/orders.module').then(m => m.OrdersModule) },
      { path: 'users', loadChildren: () => import('./admin-dashboard/pages/users/users.module').then(m => m.UsersModule) },
      { path: 'vendors', loadChildren: () => import('./admin-dashboard/pages/vendors/vendors.module').then(m => m.VendorsModule) },
      { path: 'stores', loadChildren: () => import('./admin-dashboard/pages/stores/stores.module').then(m => m.StoresModule) },
      { path: 'audit-logs', loadChildren: () => import('./admin-dashboard/pages/audit-logs/audit-logs.module').then(m => m.AuditLogsModule)},
      { path: 'events', loadChildren: () => import('./admin-dashboard/pages/events/events.module').then(m => m.EventsModule)}
    ]
  },
  // 🔹 Wildcard Redirect
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
