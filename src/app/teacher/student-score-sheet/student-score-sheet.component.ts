import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-student-score-sheet',
  templateUrl: './student-score-sheet.component.html',
  styleUrls: ['./student-score-sheet.component.css']
})
export class StudentScoreSheetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $('#dropdownMenuLink').on('show.bs.dropdown', function () {
      $(`#dropdownMenuLink`).show();

    });
  }

  holdDropDown() {
    $(`#dropdownMenuLink${1}`).addClass('show-pop');

  }
}
