import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['user', Validators.required],
    password: [''] // only for create or when changing password
  });

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data);
      // do not show password
      this.form.get('password')?.setValue('');
    }
  }

  save() {
    if (this.form.invalid) return;
    const payload = { ...this.form.value };
    if (!payload.password) delete payload.password;

    const req = this.data ? this.usersService.update(this.data._id, payload) : this.usersService.create(payload);
    req.subscribe({
      next: (res) => {
        this.snack.open('Saved', 'OK', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('save user', err);
        this.snack.open(err?.error?.msg || 'Save failed', 'Dismiss', { duration: 3000 });
      }
    });
  }

  cancel() { this.dialogRef.close(false); }
}
