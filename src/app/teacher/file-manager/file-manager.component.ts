import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  view = false;
  clipnote = true;
    constructor() { }

    ngOnInit() {
    }

    checked(event) {
      if (event === true) {
        this.view = true;
        this.clipnote = false;
      } else {
        this.view = false;
        this.clipnote = true;
      }
    }

}
