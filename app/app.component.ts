import {Component,} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
   <h1>{{title}}</h1>
   <!-- Routed views go here -->
   <router-outlet></router-outlet>   
  `
})

export class AppComponent {
  title = 'Task List';
}
