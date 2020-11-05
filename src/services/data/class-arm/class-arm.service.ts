import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addclassarm: 'api/v1/ClassArm/AddClassArm',
  getallclassarm: 'api/v1/ClassArm/GetAllClassArms',
  updateclassarm: 'ClassArm/UpdateClassArm',
  deleteclassarm: 'ClassArm/DeleteClassArm'
};

@Injectable({
  providedIn: 'root'
})
export class ClassArmService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addClassArm( addclassForm) {
    const tenantId = '1';
    const body = new FormData();
    body.append('name', addclassForm.name);
    body.append('status', addclassForm.status);
    console.log(body);
    const url = `${this.baseUrl2 + routes.addclassarm}`;
    return this.http.post(url, body, { headers: { tenantId } });
  }

  getAllClassArm() {
    const tenantId = '1';

    const url = `${this.baseUrl2 + routes.getallclassarm}`;
    return this.http.get(url, { headers: { tenantId } });
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
