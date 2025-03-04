import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import { PromotionService } from '../../../../services/data/promotion/promotion.service';

@Component({
  selector: 'app-promotion-dashboard',
  templateUrl: './promotion-dashboard.component.html',
  styleUrls: ['./promotion-dashboard.component.css']
})
export class PromotionDashboardComponent implements OnInit {
  @ViewChild('distributionChart', { static: true }) distributionChartRef: ElementRef;
  @ViewChild('deviationChart', { static: true }) deviationChartRef: ElementRef;
  chart: any = [];
  deviationChrt: any = [];
  currentSesion: any;
  levels: any;
  classList: any;


  constructor(
    private promotion: PromotionService,
    private assessment: AssessmentService,
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService,

  ) { }

  ngOnInit() {
    this.createDistributionChart();
    this.createDeviationChart();
    this.getCurrentSession();
    this.getSections();

  }

  getCurrentSession() {
    this.assessment.getCurrentSession().subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.currentSesion = res.payload.id;
        console.log(this.currentSesion);
        this.getPromotionHightlights(this.currentSesion);
      }
    });
  }

  getSections() {
    this.schoolSectionService.getSection().subscribe(
      (res: any) => {
        // tslint:disable-next-line:no-string-literal
        this.levels = res['payload'];
        // this.levels = this.levels.reverse();
        // ('levels', this.levels);
      }
    );
  }

  getClassBySectionId(id) {
    // (id);
    this.classService.getClassBySection(id).subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.classList = data.payload;
          // (this.classList);

        }
      });

  }

  getPromotionHightlights(id, classId?) {
    this.promotion.getPromotionHighlight(id, classId).subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log('sdsd', res);
      }
    });
  }

  createDistributionChart() {

    const DATA_COUNT = 12;
    const label = [];
    for (let i = 0; i < DATA_COUNT; i++) {
      label.push(i.toString());
    }
    const dataPoints = [0, 20, 20, 60, 60, 120, 80, 180, 120, 125, 105, 110, 170];

    this.chart = new Chart(this.distributionChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Distribution Chart',
            data: dataPoints,
            borderColor: ['#EA2604'],
            backgroundColor: ['#FFF7F0'],
            // backgroundColor: ['#e76f51', '#ffb638', '#ffb638' , '#ffb638', '#ffb638'],
            // hoverBorderColor: '#4288DC',
            // hoverBorderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        cutoutPercentage: 70,
        legend: {
          display: true,
          labelString: 'Class Attendance',
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                // labelString: 'Attendance Chart',
                fontColor: 'black',
                fontFamily: 'Nunito',
                fontSize: 16


              },

              gridLines: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                // labelString: 'No of students',
                fontColor: 'black',
                fontFamily: 'Nunito',
                fontSize: 16

              },
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
    );
  }

  createDeviationChart() {

    const DATA_COUNT = 12;
    const label = [];
    for (let i = 0; i < DATA_COUNT; i++) {
      label.push(i.toString());
    }
    const dataPoints = [0, 20, 20, 60, 60, 120, 80, 180, 120, 125, 105, 110, 170];

    this.deviationChrt = new Chart(this.deviationChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Deviation Chart',
            data: dataPoints,
            borderColor: ['#EA2604'],
            backgroundColor: ['#FFF7F0'],
            // backgroundColor: ['#e76f51', '#ffb638', '#ffb638' , '#ffb638', '#ffb638'],
            // hoverBorderColor: '#4288DC',
            // hoverBorderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        cutoutPercentage: 70,
        legend: {
          display: true,
          labelString: 'Class Attendance',
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                fontColor: 'black',
                fontFamily: 'Nunito',
                fontSize: 16


              },

              gridLines: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                fontColor: 'black',
                fontFamily: 'Nunito',
                fontSize: 16

              },
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
    );
  }

}
