import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TeacherService } from 'src/services/data/teacher/teacher.service';
@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  teacherId: any;
  id: any;
  teacherDetails: any;
  staffList: any;
  teachersList: any;

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.getTeacherDetailsById()
  }
 



 

  getTeacherDetailsById() {
    const helper = new JwtHelperService();
    this.teacherId = helper.decodeToken(localStorage.getItem('access_token'));
    this.id = this.teacherId.sub
    this.teacherService.getTeacherDetailsByUserId(this.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        const teacherId = data.payload.teacherId
        
        this.teacherService. getTeacherById(teacherId).subscribe((data:any)=>{
          if(data.hasErrors===false){
            this.teacherDetails = data.payload
            console.log(this.teacherDetails)
    
          }
        },error=>{
    
        })
    
        // (this.teachersList);
      }
    });
  }

 
  

}
