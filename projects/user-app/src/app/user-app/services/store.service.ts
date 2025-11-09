import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private stores = [
    {
      id: '1',
      name: 'Elegant Wedding Decorators',
      city: 'Delhi',
      image:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
      rating: 4.8,
      featured: true,
      phone: '+911234567890',
      description:
        'Specializing in luxury wedding decor, floral setups, and theme-based events.',
      products: ['Flower Arrangements', 'Lighting Setup', 'Stage Design']
    },
    {
      id: '2',
      name: 'Eventify Rentals',
      city: 'Mumbai',
      image:
        'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=800',
      rating: 4.5,
      phone: '+911234567891',
      description:
        'Providing premium event furniture and props on rent for all occasions.',
      products: ['Chairs & Tables', 'Canopy Tents', 'Dance Floor']
    },
    {
      id: '3',
      name: 'Shine Lighting Works',
      city: 'Jaipur',
      image:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      rating: 4.7,
      phone: '+911234567892',
      description:
        'Experts in wedding and stage lighting solutions with LED and fairy setups.',
      products: ['LED Light Setup', 'Fairy Lights', 'Stage Uplighting']
    }
  ];

  getAllStores() {
    return this.stores;
  }

  getStoreById(id: string) {
    return this.stores.find(s => s.id === id);
  }
}
