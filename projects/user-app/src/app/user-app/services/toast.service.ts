import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(type: ToastMessage['type'], text: string) {
      console.log("enter in show");     
    console.log("this.toastSubject",this.toastSubject);
    
    this.toastSubject.next({ type, text });
    console.log("this.toastSubject22",this.toastSubject);

    setTimeout(() => {
      console.log("showshow");      
      this.toastSubject.next(null)
    }, 3000); // auto hide
  }

  success(msg: string) {
    this.show('success', msg);
  }
  error(msg: string) {
    this.show('error', msg);
  }
  info(msg: string) {
    this.show('info', msg);
  }
  warning(msg: string) {
    this.show('warning', msg);
  }
}
