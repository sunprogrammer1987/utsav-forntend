import { Component } from '@angular/core';
import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent {
  progress = 0;
  constructor(private progressSvc: ProgressBarService) {
    console.log("ProgressBarComponent");
    
    this.progressSvc.progress$.subscribe(val => (this.progress = val));
  }
}
