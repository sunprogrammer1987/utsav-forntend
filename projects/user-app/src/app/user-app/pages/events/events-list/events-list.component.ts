import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { EventPackage } from '../../../models';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {
  events: EventPackage[] = [];
  loading = true;
  error = '';

  constructor(private bookingSvc: BookingService) {}

  ngOnInit(): void {
    this.loadEventPackages();
  }

  private loadEventPackages(): void {
    try {
      const result = this.bookingSvc.getEventPackages();

      // Handle if getEventPackages() returns observable or static array
      if (Array.isArray(result)) {
        this.events = result;
        this.loading = false;
      } else if ('subscribe' in result) {
        result.subscribe({
          next: (data: EventPackage[]) => {
            this.events = data;
            this.loading = false;
          },
          error: (err: any) => {
            console.error('Error loading events', err);
            this.error = 'Failed to load event packages.';
            this.loading = false;
          }
        });
      }
    } catch (err) {
      console.error('Error:', err);
      this.error = 'Unexpected error while fetching events.';
      this.loading = false;
    }
  }
}
