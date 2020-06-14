import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './task-view.component';
import { ListComponent } from './list/list/list.component';
import { TaskComponent } from './task/task/task.component';


const routes: Routes = [
  {
    path: '', component: TaskViewComponent, children: [
      { path: 'list', component: ListComponent, pathMatch: 'full' },
      { path: 'task', component: TaskComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskViewRoutingModule { }
