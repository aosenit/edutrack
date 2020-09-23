import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  nextModal() {
    document.getElementById('exampleModalCenter2').click();

  }

  contactPersonModal() {
    document.getElementById('exampleModalCenter3').click();
  }

}
