import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'

interface Message {
  type: string;
  payload: any;
}

type EventCallback = (payload: any) => void;

@Injectable()
export class EventService {
  private handler = new Subject<Message>();

  broadcast(type: string, payload: any) {
    this.handler.next({ type, payload });
  }

  subscribe(type: string, callback: EventCallback): Subscription {
    return this.handler
      .filter(message => message.type === type)
      .map(message => message.payload)
      .subscribe(callback);
  }
}
