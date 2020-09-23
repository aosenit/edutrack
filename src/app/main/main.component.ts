import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('works');
    $(document).ready(function () {

      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active');
      });
      $('#sidebarCollapse2').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active');
      });
      $(".input-group.nav-form > input").focus(function (e) {
        $(this).parent().addClass("nav-input-group-focus");
      }).blur(function (e) {
        $(this).parent().removeClass("nav-input-group-focus");
      });
    });
  }

}
