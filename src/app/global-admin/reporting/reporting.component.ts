import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  reportingOptions = [
    {id: 1, title: 'User Report', slug: 'userReport'},
    {id: 2, title: 'School Report', slug: 'schoolReport'},
    {id: 3, title: 'Student Report', slug: 'studentReport'},
    {id: 3, title: 'Finance Report', slug: 'financeReport'},
  ]

  userReport = [
    {id: 1, title: 'Attendance'},
    {id: 2, title: 'Daily Student Attendance'},
    {id: 3, title: 'Weekly Student Attendance'},
    {id: 4, title: 'Tern Student Attendance'},
    {id: 5, title: 'Session Student Attendance'},
  ]
  schoolReport = [
    {id: 1, title: 'Daily Student Attendance'},
    {id: 2, title: 'Weekly Student Attendance'},
    {id: 3, title: 'Tern Student Attendance'},
    {id: 4, title: 'Session Student Attendance'},
  ]
  studentReport = [
    {id: 1, title: 'Daily Student Attendance'},
    {id: 2, title: 'Weekly Student Attendance'},
    {id: 3, title: 'Tern Student Attendance'},
    {id: 4, title: 'Session Student Attendance'},
  ]
  financeReport: [
    {id: 1, title: 'Payment'},
    {id: 1, title: 'Subscriptions'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
