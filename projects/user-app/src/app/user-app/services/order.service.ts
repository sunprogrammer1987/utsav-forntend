import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  placeOrder(payload: any) {
    console.log('placing order', payload);
    return of({ success: true });
  }

  getOrders() {
    const orders = [
      {
        id: 'ORD-1001',
        date: new Date('2025-10-10'),
        total: 4599,
        status: 'Delivered',
        paymentMethod: 'UPI',
        items: [
          {
            name: 'Banquet Chair',
            qty: 4,
            price: 999,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200'
          },
          {
            name: 'Stage Light Setup',
            qty: 1,
            price: 1603,
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200'
          }
        ]
      },
      {
        id: 'ORD-1002',
        date: new Date('2025-10-12'),
        total: 12000,
        status: 'Processing',
        paymentMethod: 'Card',
        items: [
          {
            name: 'Wedding Canopy Tent',
            qty: 1,
            price: 12000,
            image: 'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=200'
          }
        ]
      },
      {
        id: 'ORD-1003',
        date: new Date('2025-09-25'),
        total: 6500,
        status: 'Cancelled',
        paymentMethod: 'Cash on Delivery',
        items: [
          {
            name: 'Stage Decoration Pack',
            qty: 1,
            price: 6500,
            image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=200'
          }
        ]
      }
    ];

    return of(orders);
  }

  getOrderById(id: string) {
  const orders = [
    {
      id: 'ORD-1001',
      date: new Date('2025-10-10'),
      total: 4599,
      status: 'Shipped',
      paymentMethod: 'UPI',
      address: '123 MG Road, Lucknow, India',
      items: [
        {
          name: 'Banquet Chair',
          qty: 4,
          price: 999,
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200'
        },
        {
          name: 'Stage Light Setup',
          qty: 1,
          price: 1603,
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200'
        }
      ]
    }
  ];

  const order = orders.find((o) => o.id === id);
  return of(order);
}


}
