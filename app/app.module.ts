import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpModule}    from '@angular/http';
import {TaskListComponent} from "./component/task-list.component";
import {CreateTaskComponent} from "./component/create-task.component";
import {TaskService} from "./service/task.service";
import {NetworkService} from "./service/network.service";
import {AppRoutingModule} from './app-rounting.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    TaskListComponent,
    CreateTaskComponent
  ],
  providers: [TaskService, NetworkService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
