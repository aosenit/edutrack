import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  getFileUplaod: 'schtrack-learning/api/v1/Files/GetFile',
};
@Injectable({
  providedIn: 'root'
})
export class FilesService {
 baseUrl: string = environment.serverUrl;
 baseUrl2: string = environment.demourl;

 constructor(private http: HttpClient) { }

 getFileUpload(id) {
  const url = `${this.baseUrl + routes.getFileUplaod}/${id}`;
  console.log(url);
  return this.http.get(url);

 }
}
