import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumniService } from 'src/services/data/alumni/alumni.service';

@Component({
  selector: 'app-admin-alumni-create-event',
  templateUrl: './admin-alumni-create-event.component.html',
  styleUrls: ['./admin-alumni-create-event.component.css']
})
export class AdminAlumniCreateEventComponent implements OnInit {
newAlumniform: FormGroup;

  constructor(
    private alumni: AlumniService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.newAlumniform = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      eventImg: null
    });
  }

  back() {
    window.history.back();
  }

  createEvent() {
    console.log(this.newAlumniform.value);
  }




}
