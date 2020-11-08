import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { environment } from 'src/environments/environment';
=======
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addschoolLevel: 'schtrack-auth/api/v1/SchoolSection/AddSection',
  getallSchoolLevels: 'schtrack-auth/api/v1/SchoolSection/GetAllSections',
  updateclassarm: 'ClassArm/UpdateClassArm',
  deleteclassarm: 'ClassArm/DeleteClassArm'
};
>>>>>>> be6b64c9f40fbee927e9c39e1eb6942e4e05ab83

@Injectable({
  providedIn: 'root'
})
export class SchoolSectionService {
  baseurl: string = environment.serverUrl;
  constructor(private http: HttpClient) { }

<<<<<<< HEAD

  addSection(name) {
    var body = {
      "name": name
    }
    return this.http.post(this.baseurl + '/SchoolSection/AddSection', body)
  }
  getSection() {
    return this.http.get(this.baseurl + '/SchoolSection/GetAllSections')
  }
  updateSection(name) {
    var body = {
      "name": name
    }
    return this.http.put(this.baseurl + '/SchoolSection/AddSection', body)
  }

  deleteSection(id) {

    return this.http.delete(this.baseurl + '/SchoolSection/DeleteSection/' + id)
=======
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addlevel(levelForm) {
    const url = `${this.baseUrl + routes.addschoolLevel}`;
    return this.http.post(url, levelForm);
  }

  getLevels() {
    const tenantId = '1';
    const url = `${this.baseUrl + routes.getallSchoolLevels}`;
    return this.http.get(url, { headers: { tenantId } });

>>>>>>> be6b64c9f40fbee927e9c39e1eb6942e4e05ab83
  }
}
