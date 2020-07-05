import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './task-view.component';
import { ListComponent } from './list/list/list.component';
import { TaskComponent } from './task/task/task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const routes: Routes = [
  {
    path: '', component: TaskViewComponent, children: [
      { path: '', redirectTo:'dashboard', pathMatch: 'full'},
      { path: 'list', component: ListComponent, pathMatch: 'full' },
      { path: 'task', component: TaskComponent, pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'userDetails', component: UserDetailsComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskViewRoutingModule { }
