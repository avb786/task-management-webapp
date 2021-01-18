import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskViewRoutingModule } from './task-view-routing.module';
import { TaskViewComponent } from './task-view.component';
import { ListComponent } from './list/list/list.component';
import { TaskListService } from 'src/app/services/task-list.service';
import { WebService } from 'src/app/services/web.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task/task.component';
import { MatButtonModule } from '@angular/material/button'
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api
import {DialogModule} from 'primeng/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import {TooltipModule} from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {RadioButtonModule} from 'primeng/radiobutton';
// import { HighlightDirective } from 'src/app/custom-directives/highlight.directive';
import { BomberGameComponent } from './bomber-game/bomber-game.component';



@NgModule({
  declarations: [TaskViewComponent, ListComponent, TaskComponent, DashboardComponent, UserDetailsComponent, BomberGameComponent],
  imports: [
    CommonModule,
    FormsModule,
    TaskViewRoutingModule,
    HttpClientModule,
    MatButtonModule,
    AccordionModule,
    DialogModule,
    MatInputModule,
    TooltipModule,
    ToastModule,
    MatCheckboxModule,
    MatSidenavModule,
    Ng2TelInputModule,
    RadioButtonModule 
        
  ],
  providers: [TaskListService, WebService]
})
export class TaskViewModule { }
