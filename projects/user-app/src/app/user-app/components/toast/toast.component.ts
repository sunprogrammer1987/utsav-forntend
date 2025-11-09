import { Component, OnInit } from '@angular/core';
import { ToastService, ToastMessage } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit {
  message: ToastMessage | null = null;

  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.toast.toast$.subscribe(msg => {
      this.message = msg;
    });
  }
}
