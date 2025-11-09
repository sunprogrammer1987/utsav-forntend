import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({ selector: 'app-event-details', templateUrl: './events-details.component.html' })
export class EventDetailsComponent {
  event: any;
  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    date: ['', Validators.required],
    address: ['', Validators.required],
    notes: ['']
  });


  constructor(private route: ActivatedRoute, private bookingSvc: BookingService, private fb: FormBuilder,
  private snack: MatSnackBar
  ) {
    const id = this.route.snapshot.paramMap.get('id');
  this.event = this.bookingSvc.getEventPackageById(id!);
  }


  submit() {
  if (this.form.invalid) return;
  this.bookingSvc.bookEvent({ ...this.form.value, packageId: this.event.id });
  this.snack.open('🎉 Event booked successfully!', 'Close', {
    duration: 3000,
    panelClass: ['bg-green-600', 'text-white']
  });
  this.form.reset();
}
}