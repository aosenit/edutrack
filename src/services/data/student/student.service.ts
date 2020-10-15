import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addstudent: '/Student/AddStudent',
  getallstudent: '/Student/GetAllStudent',
  getstudentbyid: 'Student/GetStudentById',
  updatestudentbyid: 'Student/UpdateStudent',
  deletestudent: 'Student/DeleteStudent'
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addStudent(studentForm) {
    const url = `${this.baseUrl + routes.addstudent}`;
    return this.http.post(url, studentForm);
  }

  getAllStudents() {
    const url = `${this.baseUrl + routes.getallstudent}`;
    return this.http.get(url);
  }

  getStudentById(id) {
    const url = `${this.baseUrl + routes.getstudentbyid}/${id}`;
    return this.http.get(url, id);

  }

  updateStudent(id, updateStudentForm) {
    const url = `${this.baseUrl + routes.updatestudentbyid}/${id}`;
    return this.http.put(url, updateStudentForm);

  }

  deleteStudentById(id) {
    const url = `${this.baseUrl + routes.deletestudent}/${id}`;
    return this.http.delete(url);

  }
}
