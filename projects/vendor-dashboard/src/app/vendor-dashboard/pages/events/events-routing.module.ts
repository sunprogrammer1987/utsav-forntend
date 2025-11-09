import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDetailsComponent } from './event-details/event-details.component';
const routes: Routes = [
  { path: '', component: EventsListComponent},
  { path: 'details', component: EventDetailsComponent, data: { breadcrumb: 'Add Event' } },
  { path: 'edit/:id', component: EventFormComponent, data: { breadcrumb: 'Edit Event' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
