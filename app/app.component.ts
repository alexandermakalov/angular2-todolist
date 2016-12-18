import {Component, } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
   <h1>{{title}}</h1>
   <my-task-list></my-task-list>
  `
})

export class AppComponent {
  title = 'Task List';
}
