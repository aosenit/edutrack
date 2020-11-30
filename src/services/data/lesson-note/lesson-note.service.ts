import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const routes = {
  addlessonNote: 'schtrack-learning/api/v1/LessonNote/UploadFile',
  getlessonNoteByTeacher: 'schtrack-learning/api/v1/LessonNote/GetAllFileByTeacher',
  getlessonNoteDetails: 'schtrack-learning/api/v1/LessonNote/GetLessonNoteDetail',

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
    body.append('ClassSubjectId', form.ClassSubjectId);
    body.append('FileObj', form.FileObj);
    body.append('Comment', form.Comment);
    const url = `${this.baseUrl + routes.addlessonNote}`;
    return this.http.post(url, body,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getLessonNotesByTeacher() {
    const tenantId = '1';
    const url = `${this.baseUrl + routes.getlessonNoteByTeacher}`;
    // console.log(url);
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getSinglelessonNoteDetail(id: any) {
    const tenantId = '1';
    const url = `${this.baseUrl + routes.getlessonNoteDetails}/?id=${id}`;
    // console.log(url);
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }
}
