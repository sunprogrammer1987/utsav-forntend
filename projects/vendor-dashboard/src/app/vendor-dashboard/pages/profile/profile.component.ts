import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  vendor: any;

  constructor(
    private svc: VendorService,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      shopName: [''],
      phone: [''],
      address: [''],
      city: [''],
      state: [''],
      pincode: [''],
      gstNumber: ['']
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.svc.getProfile().subscribe({
      next: (v) => {
        this.vendor = v;
        this.form.patchValue(v);
      },
      error: () => this.snack.open('Failed to load profile', 'Dismiss', { duration: 2000 })
    });
  }

  save() {
    if (this.form.invalid) return;
    this.svc.updateProfile(this.form.value).subscribe({
      next: () => this.snack.open('Profile updated successfully', 'OK', { duration: 1500 }),
      error: () => this.snack.open('Save failed', 'Dismiss', { duration: 2000 })
    });
  }

  refresh() {
    this.loadProfile();
  }
}
