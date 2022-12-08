import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { PromotionService } from 'src/services/data/promotion/promotion.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';

@Component({
  selector: 'app-class-pool',
  templateUrl: './class-pool.component.html',
  styleUrls: ['./class-pool.component.css']
})
export class ClassPoolComponent implements OnInit {
  classPoolList: any;
  currentSesion: any;
  levels: any;
  classList: any;
  noData = true;
  showData = false;
  constructor(
    private promotionService: PromotionService,
    private notificationService: NotificationsService,
    private assessment: AssessmentService,
    private levelService: SchoolSectionService,
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.getAllLevels();
    this.getCurrentSession();
  }


  getAllLevels() {
    this.levelService.getSection().subscribe((res: any) => {
      if (res.hasErrors === false ) {
        this.levels = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);

      }
    });
  }


  getCurrentSession() {
    this.assessment.getCurrentSession().subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.currentSesion = res.payload.id;
        console.log(this.currentSesion);
        this.getClassPoolList(this.currentSesion)
      }
    });
  }

  getClasseInLevel(event) {
    this.classService.getClassBySection(event).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.classList = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);

      }
    });
  }

  getClassPoolList(id) {
    this.promotionService.getClassPool(id, '').subscribe((res: any) => {
      if (res.hasErrors === false ) {
        this.classPoolList = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);
      }
    });
  }

  sortPoolByClass(event) {
    this.promotionService.getClassPool(this.currentSesion, event).subscribe((res: any) => {
      if (res.hasErrors === false ) {
        this.noData = false;
        this.showData = true;
        this.classPoolList = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);
      }
    });
  }

}
