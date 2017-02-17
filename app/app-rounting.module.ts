import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskListComponent} from './component/task-list.component';
import {CreateTaskComponent} from './component/create-task.component'
import {PageNotFoundComponent} from "./component/page-not-found/PageNotFound";

const routes: Routes = [
  {path: '', redirectTo: '/task-list', pathMatch: 'full'},
  {path: 'task-list', component: TaskListComponent},
  {path: 'create-task', component: CreateTaskComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
