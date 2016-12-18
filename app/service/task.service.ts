import {Injectable}    from '@angular/core';
import {TaskItem} from "../model/TaskItem";
import {Headers} from "@angular/http";
import {NetworkService} from "./network.service";

@Injectable()
export class TaskService {

  private taskList: Array<TaskItem> = [];

  constructor(private networkService: NetworkService) {
  }

  //TODO move to constant
  private headers = new Headers({'X-Appery-Database-Id': '58567cbde4b05633cdb0b714'});
  private tasksCollectionUrl = ' https://api.appery.io/rest/1/db/collections/TaskList';

  getTasks(): Promise<Array<TaskItem>> {
    return this.networkService.get(this.tasksCollectionUrl, this.headers)
      .then(response => {
        let body: Array<any> = response.json();
        this.taskList = body.map(item => {
            return {_id: item._id, name: item.name, description: item.description}
          }
        );
        return Promise.resolve(this.taskList);
      });
  }

  addTask(name: string): Promise<Array<TaskItem>> {
    let headers = this.headers;
    headers['Content-Type'] = 'application/json';
    let newTask: TaskItem = {name};
    return this.networkService.post(this.tasksCollectionUrl, newTask, this.headers)
      .then(response => {
        let body: any = response.json();
        newTask._id = body._id;
        this.taskList.push(newTask);
        return Promise.resolve(this.taskList);
      });
  }

  deleteTask(id: string): Promise<Array<TaskItem>> {
    let headers = this.headers;
    headers['Content-Type'] = 'application/json';
    let url = this.tasksCollectionUrl + `/${id}`;
    return this.networkService.delete(url, this.headers)
      .then(response => {
        let body: any = response.json();
        this.taskList = this.taskList.filter(item => item._id !== id);
        return Promise.resolve(this.taskList);
      });
  }
}
