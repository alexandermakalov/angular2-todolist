import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpModule}    from '@angular/http';
import {TaskListComponent} from "./component/task-list.component";
import {TaskService} from "./service/task.service";
import {NetworkService} from "./service/network.service";
import {AppRoutingModule} from './app-rounting.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    TaskListComponent
  ],
  providers: [TaskService, NetworkService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
