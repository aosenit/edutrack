import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addclass: 'schtrack-auth/api/v1/Class/AddClass',
  addstudenttoclass: 'schtrack-auth/api/v1/Class/AddStudentToClass',
  assignSubjectToClass: 'schtrack-auth/api/v1/Class/AssignSubjectToClass',
  assignTeacherToClass: 'schtrack-auth/api/v1/Class/AssignTeacherToClass ',
  getallclass: 'schtrack-auth/api/v1/Class/GetAllClasses ',
  getclassbyid: 'schtrack-auth/api/v1/Class/GetClassById',
  getstudentclass: 'schtrack-auth/api/v1/Class/GetClassByIdWithStudents',
  updateclassbyid: 'schtrack-auth/api/v1/Parent/UpdateParent ',
  deleteclass: 'schtrack-auth/api/v1/Class/UpdateClass'
};


@Injectable({
  providedIn: 'root'
})
export class ClassService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addClass(name, section, group) {
    var tenantId = '1'
    const url = `${this.baseUrl + routes.addclass}`;
    const body = new FormData()
    body.append('name', name)
    body.append('sectionId', section)
    body.append('ClassArmId', group)

    return this.http.post(url, body, { headers: { tenantId } });
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
    var tenantId = '1';
    const url = `${this.baseUrl + routes.getallclass}`;
    return this.http.get(url, { headers: { tenantId } });
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
