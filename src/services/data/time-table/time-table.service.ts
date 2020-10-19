import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addTimeTable: '/TimeTable/UploadNewTimetableForClass ',
  getallteacher: '/Teacher/GetTeachers',
  getTime: 'Teacher/GetTeachers/',
  updateteacherbyid: 'Teacher/UpdateTeacher',
  deleteteacher: 'Teacher/DeleteTeacher'
};

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  createNewTimeTable(timetableform) {
    const url = `${this.baseUrl + routes.addTimeTable}`;
    return this.http.post(url, timetableform);
  }

  getTimeTableForClass(classId) {
    const url = `${this.baseUrl + routes.addTimeTable}/${classId}`;
    return this.http.get(url);
  }
}
