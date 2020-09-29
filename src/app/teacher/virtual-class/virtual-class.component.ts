import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual-class',
  templateUrl: './virtual-class.component.html',
  styleUrls: ['./virtual-class.component.css']
})
export class VirtualClassComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

}
