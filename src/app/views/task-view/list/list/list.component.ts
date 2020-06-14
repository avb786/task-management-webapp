import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  lists: Object;
  tasks = Object;

  constructor(
    private _taskService: TaskListService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getAllList()
  }

  getAllList() {
    this._taskService.getAllList().subscribe(response => {
      this.lists = response;
      console.log("response", response, typeof response)
    }, error => {
      console.log(error);

    })
  }

  getTask(id) {
    let LIST_ID;
    if (typeof (Storage) !== "undefined") {
      sessionStorage.setItem("listId", id);

    } else {
      LIST_ID = "Sorry, your browser does not support Web Storage...";
    }
    console.log("List ID", LIST_ID);
  }


}
