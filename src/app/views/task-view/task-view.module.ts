import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { TaskViewRoutingModule } from './task-view-routing.module';
import { TaskViewComponent } from './task-view.component';
import { ListComponent } from './list/list/list.component';
import { TaskListService } from 'src/app/services/task-list.service';
import { WebService } from 'src/app/services/web.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task/task.component';


@NgModule({
  declarations: [TaskViewComponent, ListComponent, TaskComponent],
  imports: [
    CommonModule,
    TaskViewRoutingModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [TaskListService, WebService]
})
export class TaskViewModule { }
