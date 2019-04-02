import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  EventListComponent,
  EventThumbNailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  CreateSessionComponent,
  DurationPipe,
  UpvoteComponent,
  LocationValidator
} from './events/index';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionListComponent } from './events/event-details/session.list.component';
import { HttpClientModule } from '@angular/common/http';
import {
  TOASTR_TOKEN,
  Toastr,
  CollapsibleWellComponent,
  JQ_TOKEN,
  SimpleModalComponent,
  ModalTriggerDirective
} from './common/index';

const toastr: Toastr = window['toastr'];
const jQuery: Toastr = window['$'];

@ NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventListComponent,
    EventThumbNailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
  ],
  providers: [
  {
    provide: 'canDeactivateCreateEvent',
    useValue: checkDirtyState
  },
  {
    provide: TOASTR_TOKEN,
    useValue: toastr
  },
  {
    provide: JQ_TOKEN,
    useValue: jQuery
  }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you want to proceed?');
  }
  return true;
}
