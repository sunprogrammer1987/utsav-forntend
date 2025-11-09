import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { EventPackage } from '../models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private packages: EventPackage[] = [];

  constructor() {
    // Initialize event packages once
    this.packages = [
      {
        id: '1',
        name: 'Wedding Decoration Deluxe',
        type: 'Wedding',
        image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800',
        price: 25000,
        isPopular: true,
        discount: 10,
        features: ['Flower Decor', 'Lighting', 'Stage Setup']
      },
      {
        id: '2',
        name: 'Birthday Party Classic',
        type: 'Birthday',
        image: 'https://images.unsplash.com/photo-1586784275976-c69b8e1b72a3?w=800',
        price: 12000,
        features: ['Balloons', 'Cake Table', 'Sound System']
      },
      {
        id: '3',
        name: 'Corporate Event Premium',
        type: 'Corporate',
        image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800',
        price: 40000,
        discount: 15,
        features: ['Stage Design', 'LED Wall', 'Professional Lighting']
      }
    ];
  }

  /** ✅ Get all event packages */
  getEventPackages() {
    // Simulate async API call
    return of(this.packages);
  }

  /** ✅ Get single event by ID */
  getEventPackageById(id: string): EventPackage | undefined {
    return this.packages.find((p: EventPackage) => p.id === id);
  }

  /** ✅ Book event */
  bookEvent(payload: any) {
    console.log('📦 Booking event:', payload);
    localStorage.setItem('lastBooking', JSON.stringify(payload));
  }
}
