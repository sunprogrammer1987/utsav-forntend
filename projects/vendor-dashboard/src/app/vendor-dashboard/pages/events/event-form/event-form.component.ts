import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { EventsService } from '../../../services/events.service';
import { NotificationService } from 'projects/core/src/lib/core/services/notification.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html'
})
export class EventFormComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    type: ['Wedding', Validators.required],
    description: [''],
    basePrice: [0, Validators.required],
    features: [''],
    image: ['']
  });

  constructor(
    private fb: FormBuilder,
    private svc: EventsService,
    private dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notify: NotificationService
  ) {
    if (data) this.form.patchValue(data);
  }

  save() {
    if (this.form.invalid) return;
    const payload = { ...this.form.value, features: (this.form.value.features || '').split(',').map((s:any)=>s.trim()).filter(Boolean) };
    if (this.data?._id) {
      this.svc.update(this.data._id, payload).subscribe(() => { this.notify.success('Event updated'); this.dialogRef.close(true); }, () => this.notify.error('Update failed'));
    } else {
      this.svc.create(payload).subscribe(() => { this.notify.success('Event created'); this.dialogRef.close(true); }, () => this.notify.error('Create failed'));
    }
  }

  close() {
    this.dialogRef.close();
  }
}
