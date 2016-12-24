import {Component, OnInit} from '@angular/core';
import {TaskItem} from "../model/TaskItem";
import {TaskService} from '../service/task.service'

@Component({
  moduleId: module.id,
  selector: 'my-task-list',
  styleUrls: ['../css/task-list.component.css'],
  template: `
    <div>
      <label>Task name:</label> <input #taskName />
      <button (click)="addTask(taskName.value); taskName.value=''">
        Add
      </button>
    </div>
    
   <ul class="task-list">
    <li *ngFor="let task of taskList; let i = index">
       - {{i+1}} - {{task.name}}
      <button class="delete"
        (click)="deleteTask(task._id); $event.stopPropagation()">x</button>
  </ul>
  `
})

export class TaskListComponent implements OnInit {
  ngOnInit(): void {
    this.getTasks();
  }

  constructor(private taskService: TaskService) {
  }

  taskList: Array<TaskItem>;

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(taskList => this.taskList = taskList,
        err => this.handleError,
        () => console.log('getTasks Complete'));
  }

  addTask(name: string): void {
    if (!name) {
      return;
    }
    this.taskService.addTask(name)
      .subscribe(taskList => this.taskList = taskList,
        err => this.handleError,
        () => console.log(' addTask Complete'));
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
    console.error('[Network Error TaskListComponent]', error); // for demo purposes only
  }
}
