import {Component, OnInit} from '@angular/core';
import {TaskItem} from "../model/TaskItem";
import {TaskService} from '../service/task.service'
import {Router} from "@angular/router";
import {EventService} from "../service/event-service.service";
import {AppConfig} from "../app.config";

@Component({
  moduleId: module.id,
  selector: 'my-task-list',
  styleUrls: ['../css/task-list.component.css'],
  template: `        
    <button (click)="goToCreateTask()">Create Task Page</button>
    <br>
   <ul class="task-list">
    <li *ngFor="let task of taskList; let i = index" [myHighlight]="color" defaultColor="yellow">    
       - {{i+1}} - {{task.name}}
      <button class="delete"
        (click)="deleteTask(task._id); $event.stopPropagation()">x</button>
  </ul>
  `
})

export class TaskListComponent implements OnInit {
  color: string = 'green';

  ngOnInit(): void {
    this.eventService.broadcast(this.appConfig.event.changeHeader, 'List page');
    this.getTasks();
  }

  constructor(private taskService: TaskService,
              private router: Router,
              private eventService: EventService,
              private appConfig: AppConfig) {
  }

  taskList: Array<TaskItem>;

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(taskList => this.taskList = taskList,
        err => this.handleError,
        () => console.log('getTasks Complete'));
  }

  deleteTask(taskId: string): void {
    if (!taskId) {
      return;
    }
    this.taskService.deleteTask(taskId)
      .subscribe(taskList => this.taskList = taskList,
        err => this.handleError,
        () => console.log('deleteTask Complete'));
  }

  private handleError(error: any): void {
    console.error('[Network Error TaskListComponent]', error);
  }

  goToCreateTask() {
    this.router.navigate(['/create-task']);
  }
}
