import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.css']
})
export class TaskPreviewComponent implements OnInit {
name: any;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.name = this.route.snapshot.params.id;
    console.log(this.name);
  }

  

  back() {
    window.history.back();
  }

}
