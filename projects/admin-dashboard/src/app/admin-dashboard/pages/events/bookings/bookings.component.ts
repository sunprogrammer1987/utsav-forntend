import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { VendorsService } from '../../../services/vendors.service';
import { StoresService } from '../../../services/stores.service';
import { NotificationService } from 'projects/core/src/lib/core/services/notification.service';
import { BookingDetailDialogComponent } from './booking-detail-dialog/booking-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsListComponent implements OnInit {
  displayedColumns = ['bookingId', 'seller','store','event', 'price', 'eventDate', 'status', 'actions'];
  bookings: any[] = [];
  vendors: any[] = [];
  stores: any[] = [];

  selectedVendor = '';
  selectedStore = '';
  selectedStatus = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;

  loading = false;

  constructor(
    private bookingsSvc: EventsService,
    private vendorsSvc: VendorsService,
    private storesSvc: StoresService,
    private notify: NotificationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  /** 🔹 Load all vendors */
  loadVendors() {
    this.vendorsSvc.getAll().subscribe({
      next: (res) => {this.vendors = res || [];
        this.loadBookings();  
      },
      error: () => this.notify.error('Failed to load vendors')
    });
  }

  /** 🔹 When vendor changes, load related stores */
  onVendorChange() {
    if (!this.selectedVendor) {
      this.stores = [];
      this.selectedStore = '';
      this.loadBookings();
      return;
    }

    this.storesSvc.getStoresByVendor(this.selectedVendor).subscribe({
      next: (res) => {
        this.stores = res || [];
        this.selectedStore = '';
        this.loadBookings();
      },
      error: () => this.notify.error('Failed to load stores')
    });
  }

  /** 🔹 Load bookings with filters */
  loadBookings() {
    this.loading = true;

    const params: any = {
      vendor: this.selectedVendor || '',
      store: this.selectedStore || '',
      status: this.selectedStatus || '',
      from: this.fromDate ? this.fromDate.toISOString() : '',
      to: this.toDate ? this.toDate.toISOString() : ''
    };

    this.bookingsSvc.getAll(params).subscribe({
      next: (res: any) => {
        this.bookings = res.bookings || res;
        console.log("res",res);
        
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Failed to load bookings');
      }
    });
  }

  /** 🔹 Reset all filters */
  resetFilters() {
    this.selectedVendor = '';
    this.selectedStore = '';
    this.selectedStatus = '';
    this.fromDate = null;
    this.toDate = null;
    this.loadBookings();
  }

  /** 🔹 Update booking status */
  updateStatus(booking: any, newStatus: string) {
    this.bookingsSvc.updateBookingStatus(booking._id, newStatus).subscribe({
      next: () => {
        booking.status = newStatus;
        this.notify.success(`Booking marked as ${newStatus}`);
      },
      error: () => this.notify.error('Failed to update status')
    });
  }

  viewDetails(order: any) {
      this.dialog.open(BookingDetailDialogComponent, {
        width: '600px',
        data: order
      });
   }
}
