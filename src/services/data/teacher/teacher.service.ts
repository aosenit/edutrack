import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addteacher: '/Teacher/AddTeacher ',
  getallteacher: '/Teacher/GetTeachers',
  getteacherbyid: 'Teacher/GetTeachers/',
  updateteacherbyid: 'Teacher/UpdateTeacher',
  deleteteacher: 'Teacher/DeleteTeacher'
};
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addTeacher(createTeacherForm) {
    const url = `${this.baseUrl + routes.addteacher}`;
    return this.http.post(url, createTeacherForm);
  }

  getAllTeachers() {
    const url = `${this.baseUrl + routes.getallteacher}`;
    return this.http.get(url);
  }

  getTeacherById(userid) {
    const url = `${this.baseUrl + routes.getteacherbyid}/${userid}`;
    return this.http.get(url, userid);
  }

  updateTeacher(userid, updateTeacherForm) {
    const url = `${this.baseUrl + routes.updateteacherbyid}/${userid}`;
    return this.http.put(url, updateTeacherForm);

  }

  deleteTeacherById(userid) {
    const url = `${this.baseUrl + '/givenApi'}/${userid}`;
    return this.http.delete(url);

  }
}
