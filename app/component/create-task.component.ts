import {Component, OnInit} from '@angular/core';
import {TaskItem} from "../model/TaskItem";
import {TaskService} from '../service/task.service'
import {Location} from '@angular/common';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {forbiddenNameValidator} from '../validator/forbidden-name.directive';
@Component({
  moduleId: module.id,
  selector: 'my-create-task',
  styleUrls: ['../css/create-task.component.css'],
  template: `
    <div>
      <h1>Create task</h1>
      <button (click)="goBack()">Back</button>
      <form novalidate [formGroup]="taskForm">
        <input type="text" formControlName="name"> <label>Task name </label>
         <div *ngIf="formErrors.name">
          {{ formErrors.name }}
        </div>
        <br>
       <button (click)="addTask()" [disabled]="!taskForm.valid">
        Add Task
      </button>
      
      <div *ngIf="componentMessage.httpMessage">
          {{ componentMessage.httpMessage }}
      </div>
      
      </form>
      
    </div>   

  `
})

export class CreateTaskComponent implements OnInit {
  private taskForm: FormGroup;
  private task: TaskItem = new TaskItem();
  private formErrors = {
    'name': ''
  };

  private validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      'forbiddenName': '"Task" is forbidden name '
    }
  };

  private componentMessage = {
    httpMessage: ''
  };


  ngOnInit(): void {
    this.buildForm();
  }

  constructor(private taskService: TaskService,
              private location: Location,
              private fb: FormBuilder) {
  }

  goBack(): void {
    this.location.back();
  }

  buildForm(): void {
    this.taskForm = this.fb.group({
      'name': [this.task.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
        forbiddenNameValidator(/task/i)
      ]]
    });

    this.taskForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.taskForm) {
      return;
    }
    const form = this.taskForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  addTask(): void {
    this.task = this.taskForm.value;
    if (!this.task.name) {
      return;
    }
    this.taskService.addTask(this.task.name)
      .subscribe(taskList => {
          this.taskForm.reset();
          this.componentMessage.httpMessage = 'Task added'
        },
        err => this.componentMessage.httpMessage = 'Task add  error',
        () => console.log(' addTask Complete'));
  }


}
