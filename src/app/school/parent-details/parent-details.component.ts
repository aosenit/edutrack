import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-parent-details',
  templateUrl: './parent-details.component.html',
  styleUrls: ['./parent-details.component.css']
})
export class ParentDetailsComponent implements OnInit {
id: any;
parentDetails: any;
  constructor(
            private parentService: ParentsService,
            private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    // (this.id);
    this.getParentDetailsByID();
  }

  back() {
    window.history.back();
  }


  getParentDetailsByID() {
    this.parentService.getParentById(this.id).subscribe((data: any) => {
      // (data);
      if (data.hasErrors === false) {
        this.parentDetails = data.payload;
        // ('assas', this.parentDetails);
      }
    });
  }


}
