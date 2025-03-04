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
  getallsubjectsWithAssignmentforclass: 'schtrack-learning/api/v1/ClassSubject/GetSubjectsForClassWithAssignmentCount', // this endpoint get all subjects and assignment counts in each subject
  // tslint:disable-next-line:max-line-length
  getallsubjectsWithFiles: 'schtrack-learning/api/v1/ClassSubject/GetSubjectsForClassWithFilesCount', // this endpoint get all subjects and assignment counts in each subject
  // tslint:disable-next-line:max-line-length
  getTeacherforSubject: 'schtrack-learning/api/v1/TeacherClassSubject/GetTeachersForClassSubject', // this endpoint get all subjects attached to a class
  assignSubjectToClass: 'schtrack-auth/api/v1/Class/AssignSubjectToClass',
  assignTeacherToClass: 'schtrack-auth/api/v1/Class/AssignTeacherToClass',
  getallclass: 'schtrack-auth/api/v1/Class/GetAllClasses',
  getclassbyid: 'schtrack-auth/api/v1/Class/GetClassById',
  getstudentclass: 'schtrack-auth/api/v1/Class/GetClassByIdWithStudents',
  getTeacherclass: 'schtrack-auth/api/v1/Teacher/GetTeacherClass',
  deleteclass: 'schtrack-auth/api/v1/Class/DeleteClass',
  getClassAndSubjectForATeahcer: 'schtrack-learning/api/v1/TeacherClassSubject/GetAllClassSubjectsForTeacher',
  getStudentInclass: 'schtrack-auth/api/v1/Student/GetStudentInClass',
  updateclassbyid: 'schtrack-auth/api/v1/Class/UpdateClass',
  
  updateparentbyid: 'schtrack-auth/api/v1/Parent/UpdateParent',

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

    return this.http.post(url, result, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  addStudentsToClass(addStudentForm) {
    const url = `${this.baseUrl + routes.addstudenttoclass}`;
    return this.http.post(url, addStudentForm, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getClassBySection(id) {
    const url = `${this.baseUrl + routes.getclassbysection}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  assignSubjectToClass(id: any, form) {
    const url = `${this.baseUrl + routes.assignSubjectToClass}/${id}`;
    return this.http.post(url, form, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  assignTeachToClass(id: any, form) {
    const url = `${this.baseUrl + routes.assignTeacherToClass}/${id}`;
    return this.http.post(url, form, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getAllClasses() {

    const url = `${this.baseUrl + routes.getallclass}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  getAllClassesWithPagination(p, perpage) {

    const url = `${this.baseUrl + routes.getallclass}?PageIndex=${p}&PageSize=${perpage}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getClassById(id) {
    const url = `${this.baseUrl + routes.getclassbyid}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getClassByIdWithStudent(id: any) {
    const url = `${this.baseUrl + routes.getstudentclass}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  updateParent(id, updateParentForm) {
    const url = `${this.baseUrl + routes.updateparentbyid}/${id}`;
    return this.http.put(url, updateParentForm, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  editClass(payload) {
    const url = `${this.baseUrl + routes.updateclassbyid}`;

    // tslint:disable-next-line:max-line-length
    return this.http.put(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  deleteClassById(id) {
    const url = `${this.baseUrl + routes.deleteclass}/${id}`;
    return this.http.delete(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  getAllSubjectsInAClassWithAssignmentCountByClassID() {
    const url = `${this.baseUrl + routes.getallsubjectsWithAssignmentforclass}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getAllSubjectsInAClassByClassID(id) {
    const url = `${this.baseUrl + routes.getallsubjectsWithAssignmentforclass}?classid=${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getAllSubjectsInAClassWithClassNotePreview() {
    const url = `${this.baseUrl + routes.getallsubjectsWithFiles}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  getTeacherTeachingSubject(id: any) {
    const url = `${this.baseUrl + routes.getTeacherforSubject}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getClassAndSubjectForTeacherByTeacherId() {
    const url = `${this.baseUrl + routes.getClassAndSubjectForATeahcer}`;
    // ('teacher for sucject', url);
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getTeacherClassesByClassId(id: any) {
    const url = `${this.baseUrl + routes.getTeacherclass}/${id}`;
    // ('teacher for sucject', url);
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getStudentsInAClassByClassID(classId) {
    const url = `${this.baseUrl + routes.getStudentInclass}/${classId}`;

    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getSubjectForClass(classId) {
    const url = `${this.baseUrl + routes.getallsubjectsforclass}?classId=${classId}`;

    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
}
