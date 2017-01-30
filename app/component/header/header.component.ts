import {Component, OnInit, OnDestroy} from "@angular/core";
import {AppConfig} from "../../app.config";
import {Subscription} from 'rxjs/Subscription'
import {EventService} from "../../service/event-service.service";

interface IHeader {
  value:string;
}

@Component({
  moduleId: module.id,
  selector: 'my-header',
  styleUrls: ['./header.component.css'],
  template: `
    <div class="header"><h1>{{header.value}}</h1></div>
  `
})

export class HeaderComponent implements OnInit, OnDestroy {

  private header: IHeader;
  private subscription: Subscription;

  constructor(private appConfig: AppConfig, private eventService: EventService) {
    this.header = {value: 'start page'};
  }

  ngOnInit(): void {
    this.header.value  = this.appConfig.headerTitle;
    this.subscription = this.eventService.subscribe(this.appConfig.event.changeHeader, (value) => this.header.value  = value);
  }

  private changeHeaderTitle(value: string) {
    this.header.value  = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
