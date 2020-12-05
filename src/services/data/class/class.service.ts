import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const tenantId = '1';
const routes = {
  addclass: 'schtrack-auth/api/v1/Class/AddClass',
  addstudenttoclass: 'schtrack-auth/api/v1/Class/AddStudentToClass',
  getclassbysection: 'schtrack-auth/api/v1/Class/GetClassBySection',
  getallsubjectsforclass: 'schtrack-learning/api/v1/ClassSubject/GetSubjectsForClass', // this endpoint get all subjects attached to a class
  // tslint:disable-next-line:max-line-length
  getallsubjectsWithAssignmentforclass: 'schtrack-learning/api/v1/ClassSubject/GetSubjectsForClassWithAssignmentCount', // this endpoint get all subjects attached to a class
  // tslint:disable-next-line:max-line-length
  getTeacherforSubject: 'schtrack-learning/api/v1/TeacherClassSubject/GetTeachersForClassSubject', // this endpoint get all subjects attached to a class
  assignSubjectToClass: 'schtrack-auth/api/v1/Class/AssignSubjectToClass',
  assignTeacherToClass: 'schtrack-auth/api/v1/Class/AssignTeacherToClass',
  getallclass: 'schtrack-auth/api/v1/Class/GetAllClasses',
  getclassbyid: 'schtrack-auth/api/v1/Class/GetClassById',
  getstudentclass: 'schtrack-auth/api/v1/Class/GetClassByIdWithStudents',
  updateclassbyid: 'schtrack-auth/api/v1/Parent/UpdateParent ',
  deleteclass: 'schtrack-auth/api/v1/Class/DeleteClass'
};


@Injectable({
  providedIn: 'root'
})
export class ClassService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;


  constructor(private http: HttpClient) { }

  addClass(result) {
    const url = `${this.baseUrl + routes.addclass}`;
    console.log(url);
    return this.http.post(url, result, { headers: { tenantId } });
  }

  addStudentsToClass(addStudentForm) {
    const url = `${this.baseUrl + routes.addstudenttoclass}`;
    return this.http.post(url, addStudentForm, { headers: { tenantId } });
  }

  getClassBySection(id) {
    const url = `${this.baseUrl + routes.getclassbysection}/${id}`;
    return this.http.get(url, { headers: { tenantId } });
  }

  assignSubjectToClass(id: any, form) {
    const url = `${this.baseUrl + routes.assignSubjectToClass}/${id}`;
    return this.http.post(url, form, { headers: { tenantId } });
  }

  assignTeachToClass(id: any, form) {
    const url = `${this.baseUrl + routes.assignTeacherToClass}/${id}`;
    return this.http.post(url, form, { headers: { tenantId } });  // (form) will be changes to when necessary
  }

  getAllClasses() {

    const url = `${this.baseUrl + routes.getallclass}`;
    return this.http.get(url, { headers: { tenantId } });
  }
  getAllClassesWithPagination(p, perpage) {

    const url = `${this.baseUrl + routes.getallclass}?PageIndex=${p}&PageSize=${perpage}`;
    return this.http.get(url, { headers: { tenantId } });
  }

  getClassById(id) {
    const url = `${this.baseUrl + routes.getclassbyid}/${id}`;
    return this.http.get(url, { headers: { tenantId } });
  }

  getClassByIdWithStudent(id: any) {
    const url = `${this.baseUrl + routes.getstudentclass}/${id}`;
    return this.http.get(url, { headers: { tenantId } });
  }

  updateParent(id, updateParentForm) {
    const url = `${this.baseUrl + routes.updateclassbyid}/${id}`;
    return this.http.put(url, updateParentForm, { headers: { tenantId } });

  }

  editClass(id, name) {
    const body = new FormData();
    body.append('Id', id);
    body.append('Name', name);
    return this.http.put(this.baseUrl + 'schtrack-auth/api/v1/Class/UpdateClass', body, { headers: { tenantId } });
  }
  deleteClassById(id) {
    const url = `${this.baseUrl + routes.deleteclass}/${id}`;
    return this.http.delete(url, { headers: { tenantId } });

  }

  getAllSubjectsInAClassWithAssignmentCountByClassID(id: any) {
    const url = `${this.baseUrl + routes.getallsubjectsWithAssignmentforclass}?classid=${id}`;
    console.log(url);
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getAllSubjectsInAClassByClassID(id) {
    const url = `${this.baseUrl + routes.getallsubjectsWithAssignmentforclass}?classid=${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }
  getTeacherTeachingSubject(id: any) {
    const url = `${this.baseUrl + routes.getTeacherforSubject}/${id}`;
    console.log('teacher for sucject', url);
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }
}
