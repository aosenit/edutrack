import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  comment() {
    const comment = document.querySelector('.comment');
    const screen = document.querySelector('.sideA');

    comment.classList.toggle('remove-comment');
    screen.classList.toggle('make-full');
  }

}
