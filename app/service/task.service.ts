import {Injectable}    from '@angular/core';
import {TaskItem} from "../model/TaskItem";
import {Headers} from "@angular/http";
import {NetworkService} from "./network.service";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  private taskList: Array<TaskItem> = [];

  constructor(private networkService: NetworkService) {
  }

  //TODO move to constant
  private headers = new Headers({'X-Appery-Database-Id': '58567cbde4b05633cdb0b714'});
  private tasksCollectionUrl = ' https://api.appery.io/rest/1/db/collections/TaskList';

  getTasks(): Observable<Array<TaskItem>> {
    return this.networkService
      .get(this.tasksCollectionUrl, this.headers)
      .map(res => {
        let body: Array<any> = res;
        this.taskList = body.map(item => {
            return new TaskItem(item.name, item._id, item.description);
          }
        );
        return this.taskList;
      });
  }

  addTask(name: string): Observable<Array<TaskItem>> {
    let headers = this.headers;
    headers['Content-Type'] = 'application/json';
    let newTask: TaskItem = new TaskItem(name);
    return this.networkService
      .post(this.tasksCollectionUrl, newTask, this.headers)
      .map(response => {
        let body: any = response;
        newTask._id = body._id;
        this.taskList.push(newTask);
        return this.taskList;
      });
  }

  deleteTask(id: string): Observable<Array<TaskItem>> {
    let headers = this.headers;
    headers['Content-Type'] = 'application/json';
    let url = this.tasksCollectionUrl + `/${id}`;
    return this.networkService
      .delete(url, this.headers)
      .map(response => {
        let body: any = response;
        this.taskList = this.taskList.filter(item => item._id !== id);
        return this.taskList;
      });
  }
}
