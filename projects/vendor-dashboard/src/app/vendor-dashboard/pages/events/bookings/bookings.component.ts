import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { StoreStateService } from '../../../services/store-state.service';
import { BookingDetailDialogComponent } from './booking-detail-dialog/booking-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsListComponent implements OnInit {
  bookings: any[] = [];
  loading = true;
  selectedStatus = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  storeSub!: Subscription;
  storeId: string = 'all';

  displayedColumns = ['bookingId', 'seller', 'store', 'event', 'price', 'eventDate', 'status', 'actions'];

  constructor(private svc: EventsService, private dialog: MatDialog, private snack: MatSnackBar, private storeState: StoreStateService) { }

  ngOnInit() {
    this.storeSub = this.storeState.store$.subscribe(id => {
      this.storeId = id;
      this.loadBookings();
    });
  }

  loadBookings() {
    this.loading = true;
    const params: any = {
      store: this.storeId,
      status: this.selectedStatus || '',
      from: this.fromDate ? this.fromDate.toISOString() : '',
      to: this.toDate ? this.toDate.toISOString() : ''
    };
    this.svc.listBookings(params).subscribe({
      next: (res: any) => {
        this.bookings = res.bookings || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.snack.open('Failed to load bookings', 'Dismiss', { duration: 2500 });
      }
    });
  }

  updateStatus(bk: any, status: string) {
    this.svc.updateBookingStatus(bk._id, status).subscribe({
      next: (res: any) => {
        bk.status = res.status;
        this.snack.open(`Booking marked as ${status}`, 'OK', { duration: 2000 });
      },
      error: () => this.snack.open('Failed to update status', 'Dismiss', { duration: 2500 })
    });
  }

  resetFilters() {
    this.selectedStatus = '';
    this.fromDate = null;
    this.toDate = null;
    this.loadBookings();
  }
  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  viewDetails(order: any) {
        this.dialog.open(BookingDetailDialogComponent, {
          width: '600px',
          data: order
        });
   }
}
