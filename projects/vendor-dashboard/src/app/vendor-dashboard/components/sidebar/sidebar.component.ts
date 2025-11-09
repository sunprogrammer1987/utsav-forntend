import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menu = [
    { label: 'Dashboard', icon: 'dashboard', link: '/' },
    { label: 'Orders', icon: 'shopping_cart', link: '/orders' },
    { label: 'Categories', icon: 'category', link: '/categories' },
    { label: 'Products', icon: 'inventory_2', link: '/products' },
    { label: 'Stores', icon: 'store', link: '/stores' },
    { label: 'Events', icon: 'events', link: '/events' },
    { label: 'Profile', icon: 'person', link: '/profile' }
  ];
}

