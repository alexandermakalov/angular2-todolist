import {Component, OnInit} from '@angular/core';
import {EventService} from "../../service/event-service.service";
import {AppConfig} from "../../app.config";

@Component({
  template: '<a routerLink="/">Home page</a>'
})
export class PageNotFoundComponent implements OnInit{

  ngOnInit(): void {
    this.eventService.broadcast(this.appConfig.event.changeHeader, 'Page Not Found');
  }

  constructor(private eventService: EventService,
              private appConfig: AppConfig) {
  }
}
