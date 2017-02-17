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
import {HighlightDirective} from './component/highlight.directive';
import {HeaderComponent} from './component/header/header.component';
import {PageNotFoundComponent} from './component/page-not-found/PageNotFound'
import {AppConfig} from './app.config'
import {EventService} from "./service/event-service.service";

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
    CreateTaskComponent,
    HighlightDirective,
    HeaderComponent,
    PageNotFoundComponent
  ],
  providers: [TaskService, NetworkService, AppConfig, EventService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
