import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const routes = {
  addlessonNote: 'schtrack-learning/api/v1/LessonNote/UploadFile',
  getAssignmentByTeacher: 'schtrack-learning/api/v1/Assignment/GetAssignmentsByTeacher',

};
@Injectable({
  providedIn: 'root'
})
export class LessonNoteService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addLessonNote(form) {
    const tenantId = '1';

    const body = new FormData();
    body.append('SubjectId', form.SubjectId);
    body.append('ClassId', form.ClassId);
    body.append('FileObj', form.FileObj);
    const url = `${this.baseUrl + routes.addlessonNote}`;
    return this.http.post(url, body,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getAssignmentByTeacher() {

  }
}
