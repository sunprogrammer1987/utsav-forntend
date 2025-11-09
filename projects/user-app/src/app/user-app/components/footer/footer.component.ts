import { Component } from '@angular/core';
import { environment } from 'projects/user-app/src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  year = new Date().getFullYear();

  constructor() {
    console.log('🌐 API URL:', environment.apiUrl);
  }
}
