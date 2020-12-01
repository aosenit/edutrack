import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-score-sheet',
  templateUrl: './score-sheet.component.html',
  styleUrls: ['./score-sheet.component.css']
})
export class ScoreSheetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#myDropdown').on('show.bs.dropdown', () => {
      // do something…
    });
  }

}
