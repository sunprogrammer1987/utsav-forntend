import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventsService } from '../../../services/events.service';
import { NotificationService } from 'projects/core/src/lib/core/services/notification.service';
import { StoresService } from '../../../services/stores.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html'
})
export class EventFormComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    type: ['Wedding', Validators.required],
    store: ['', Validators.required],
    description: [''],
    basePrice: [0, Validators.required],
    features: [''],
    image: ['']
  });

  stores: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private svc: EventsService,
    private storesSvc: StoresService,
    private notify: NotificationService,
    private dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) this.form.patchValue(data);
  }

  ngOnInit() {
    this.loadStores();

    // If editing existing event
    if (this.data?.store?._id) {
      this.form.patchValue({ store: this.data.store._id });
    }
  }

  /** 🔹 Load all stores (admin) or vendor's stores (if vendor logged in) */
  loadStores() {
    this.storesSvc.getAll().subscribe({
      next: (res) => (this.stores = res),
      error: () => this.notify.error('Failed to load stores')
    });
  }

  /** 🔹 Save form */
  save() {
    if (this.form.invalid) {
      this.notify.error('Please fill all required fields');
      return;
    }

    const payload = {
      ...this.form.value,
      features: (this.form.value.features || '')
        .split(',')
        .map((s: any) => s.trim())
        .filter(Boolean)
    };

    this.loading = true;

    const request$ = this.data?._id
      ? this.svc.update(this.data._id, payload)
      : this.svc.create(payload);

    request$.subscribe({
      next: () => {
        this.notify.success(this.data?._id ? 'Event updated' : 'Event created');
        this.dialogRef.close(true);
      },
      error: () => this.notify.error('Operation failed'),
      complete: () => (this.loading = false)
    });
  }

  close() {
    this.dialogRef.close();
  }
}
