import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addgrade: 'schtrack-assessment/api/v1/GradeSetup/AddGradeSetup',
  getAllgrades: 'schtrack-assessment/api/v1/GradeSetup/GetAllGradeForSchoolSetup',
  updategrade: 'schtrack-assessment/api/v1/GradeSetup/UpdateGradeSetup',
  deletegrade: 'schtrack-assessment/api/v1/GradeSetup/RemoveGradeSetup',
};

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addGrade(result) {
    const url = `${this.baseUrl + routes.addgrade}`;
    return this.http.post(url, result, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getAllGrades() {
    const url = `${this.baseUrl + routes.getAllgrades}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  updateGradeSetup(payload) {
    const url = `${this.baseUrl + routes.updategrade}`;
    return this.http.put(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  deleteGradeSetup(id) {
    const url = `${this.baseUrl + routes.deletegrade}?id=${id}`;
    return this.http.delete(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }
}
