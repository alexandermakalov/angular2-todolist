import {Component,} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `   
   <my-header></my-header>
   <!-- Routed views go here -->
   <router-outlet></router-outlet>   
  `
})

export class AppComponent {}
