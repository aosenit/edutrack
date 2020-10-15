import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newrole',
  templateUrl: './newrole.component.html',
  styleUrls: ['./newrole.component.css']
})
export class NewroleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

}
