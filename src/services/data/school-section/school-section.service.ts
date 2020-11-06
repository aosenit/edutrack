import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addschoolLevel: 'schtrack-auth/api/v1/SchoolSection/AddSection',
  getallSchoolLevels: 'schtrack-auth/api/v1/SchoolSection/GetAllSections',
  updateclassarm: 'ClassArm/UpdateClassArm',
  deleteclassarm: 'ClassArm/DeleteClassArm'
};

@Injectable({
  providedIn: 'root'
})
export class SchoolSectionService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addlevel(levelForm) {
    const url = `${this.baseUrl + routes.addschoolLevel}`;
    return this.http.post(url, levelForm);
  }

  getLevels() {
    const url = `${this.baseUrl + routes.getallSchoolLevels}`;
    return this.http.get(url);
  }
}
