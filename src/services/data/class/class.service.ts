import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addclass: 'Class/AddClass',
  addstudenttoclass: 'Class/AddStudentToClass',
  assignSubjectToClass: 'Class/AssignSubjectToClass',
  assignTeacherToClass: 'Class/AssignTeacherToClass ',
  getallclass: 'Class/GetAllClasses ',
  getclassbyid: 'Class/GetClassById',
  getstudentclass: 'Class/GetClassByIdWithStudents',
  updateclassbyid: 'Parent/UpdateParent ',
  deleteclass: 'Class/UpdateClass'
};


@Injectable({
  providedIn: 'root'
})
export class ClassService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addParent(createNewClassForm) {
    const url = `${this.baseUrl + routes.addclass}`;
    return this.http.post(url, createNewClassForm);
  }

  addStudentsToClass(addStudentForm) {
    const url = `${this.baseUrl + routes.addstudenttoclass}`;
    return this.http.post(url, addStudentForm);
  }

  assignSubjectToClass(id: any, form) {
    const url = `${this.baseUrl + routes.assignSubjectToClass}/${id}`;
    return this.http.post(url, form);
  }

  assignTeachToClass(id: any, form) {
    const url = `${this.baseUrl + routes.assignTeacherToClass}/${id}`;
    return this.http.post(url, form);  // (form) will be changes to when necessary
  }

  getAllClasses() {
    const url = `${this.baseUrl + routes.getallclass}`;
    return this.http.get(url);
  }

  getClassById(id) {
    const url = `${this.baseUrl + routes.getclassbyid}/${id}`;
    return this.http.get(url, id);
  }

  getClassByIdWithStudent(studid) {
    const url = `${this.baseUrl + routes.getstudentclass}/${studid}`;
    return this.http.get(url, studid);
  }

  updateParent(id, updateParentForm) {
    const url = `${this.baseUrl + routes.updateclassbyid}/${id}`;
    return this.http.put(url, updateParentForm);

  }

  deleteClassById(id) {
    const url = `${this.baseUrl + routes.deleteclass}/${id}`;
    return this.http.delete(url);

  }
}
