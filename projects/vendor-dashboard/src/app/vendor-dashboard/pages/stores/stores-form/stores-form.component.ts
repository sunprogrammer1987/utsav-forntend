import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoresService } from '../../../services/stores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-store-form',
  templateUrl: './stores-form.component.html'
})
export class StoresFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<StoresFormComponent>,
    private fb: FormBuilder,
    private svc: StoresService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      address: [''],
      city: [''],
      state: [''],
      pincode: [''],
      gstNumber: [''],
      phone: ['']
    });
  }

  ngOnInit() {
    if (this.data) { this.isEdit = true; this.form.patchValue(this.data); }
  }

  save() {
    if (this.form.invalid) return;
    const payload = this.form.value;
    const req = this.isEdit ? this.svc.updateStore(this.data._id, payload) : this.svc.create ? this.svc.create(payload) : this.svc.updateStore('', payload);
    req.subscribe({
      next: () => { this.snack.open('Saved', 'OK',{ duration:1500 }); this.ref.close(true); },
      error: (err) => { this.snack.open('Save failed', 'Dismiss', { duration:2000 }); }
    });
  }

  close() { this.ref.close(false); }
}
