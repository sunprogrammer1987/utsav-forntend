import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './user-app/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: () => import('./user-app/pages/home/home.module').then(m => m.HomeModule) },
  { path: 'products', loadChildren: () => import('./user-app/pages/products/products.module').then(m => m.ProductsModule) },
  { path: 'cart', loadChildren: () => import('./user-app/pages/cart/cart.module').then(m => m.CartModule) },
  { path: 'checkout', loadChildren: () => import('./user-app/pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'auth', loadChildren: () => import('./user-app/pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'orders', loadChildren: () => import('./user-app/pages/orders/orders.module').then(m => m.OrdersModule) },
  { path: 'profile', loadChildren: () => import('./user-app/pages/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'events', loadChildren: () => import('./user-app/pages/events/events.module').then(m => m.EventsModule) },
  { path: 'stores', loadChildren: () => import('./user-app/pages/stores/stores.module').then(m => m.StoresModule) },
  { path: 'wishlist', loadChildren: () => import('./user-app/pages/wishlist/wishlist.module').then(m => m.WishlistModule) },
  { path: 'categories', loadChildren: () => import('./user-app/pages/categories/categories.module').then(m => m.CategoriesModule) },
  { path: '**', redirectTo: 'home' }


];


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
