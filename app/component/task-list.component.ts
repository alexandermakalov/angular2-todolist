import {Component, OnInit} from '@angular/core';
import {TaskItem} from "../model/TaskItem";
import {TaskService} from '../service/task.service'
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'my-task-list',
  styleUrls: ['../css/task-list.component.css'],
  template: `
    <h1>{{title}}</h1>    
    <button (click)="goToCreateTask()">Create Task Page</button>
    <br>
   <ul class="task-list">
    <li *ngFor="let task of taskList; let i = index">
       - {{i+1}} - {{task.name}}
      <button class="delete"
        (click)="deleteTask(task._id); $event.stopPropagation()">x</button>
  </ul>
  `
})

export class TaskListComponent implements OnInit {
  title = 'Task List';
  ngOnInit(): void {
    this.getTasks();
  }

  constructor(private taskService: TaskService,
              private router: Router,) {
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
