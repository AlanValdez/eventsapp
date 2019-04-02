import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './user/auth.service';

@ Component({
  selector: 'events-app',
  template: `
    <nav-bar></nav-bar>
    <router-outlet></router-outlet>
  `,
})
export class EventsAppComponent implements OnInit {

  constructor(private http:HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.auth.checkAuthenticationStatus();
  }

}
