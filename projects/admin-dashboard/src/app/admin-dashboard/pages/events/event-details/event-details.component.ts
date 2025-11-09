// event-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events.service';

@Component({ selector: 'app-event-details', templateUrl: './event-details.component.html' })
export class EventDetailsComponent implements OnInit {
  event: any;
  constructor(private route: ActivatedRoute, private svc: EventsService) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.svc.get(id).subscribe(e => this.event = e);
  }
}
