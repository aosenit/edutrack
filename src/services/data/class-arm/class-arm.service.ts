import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addclassarm: 'ClassArm/AddClassArm',
  getallclassarm: 'ClassArm/GetAllClassArms',
  updateclassarm: 'ClassArm/UpdateClassArm',
  deleteclassarm: 'ClassArm/DeleteClassArm'
};

@Injectable({
  providedIn: 'root'
})
export class ClassArmService {

  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addClassArm(studentForm) {
    const url = `${this.baseUrl + routes.addclassarm}`;
    return this.http.post(url, studentForm);
  }

  getAllClassArm() {
    const url = `${this.baseUrl + routes.getallclassarm}`;
    return this.http.get(url);
  }

  updateClassArm(id: any, updateClassArmForm) {
    const url = `${this.baseUrl + routes.updateclassarm}`;
    return this.http.put(url, updateClassArmForm );
  }

  deleteClassArm(id: any) {
    const url = `${this.baseUrl + routes.deleteclassarm}/${id}`;
    return this.http.delete(url );
  }
}
