import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addclassarm: 'schtrack-auth/api/v1/ClassArm/AddClassArm',
  getallclassarm: 'schtrack-auth/api/v1/ClassArm/GetAllClassArms',
<<<<<<< HEAD
=======
  getclassarmById: 'schtrack-auth/api/v1/ClassArm/GetAllClassArm',
>>>>>>> be6b64c9f40fbee927e9c39e1eb6942e4e05ab83
  updateclassarm: 'schtrack-auth/api/v1/ClassArm/UpdateClassArm',
  deleteclassarm: 'schtrack-auth/api/v1/ClassArm/DeleteClassArm'
};

@Injectable({
  providedIn: 'root'
})
export class ClassArmService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addClassArm( addclassForm) {
    const tenantId = '1'; // just a temporary header till email services is ready
    const body = new FormData();
    body.append('name', addclassForm.name);
    body.append('status', addclassForm.status);
    console.log(body);
    const url = `${this.baseUrl + routes.addclassarm}`;
    return this.http.post(url, body, { headers: { tenantId } });
  }

  getAllClassArm() {
    const tenantId = '1';

    const url = `${this.baseUrl + routes.getallclassarm}`;
<<<<<<< HEAD
=======
    return this.http.get(url, { headers: { tenantId } });
  }

  getClassArmById(id) {
    const tenantId = '1';

    const url = `${this.baseUrl + routes.getclassarmById}/${id}`;
>>>>>>> be6b64c9f40fbee927e9c39e1eb6942e4e05ab83
    return this.http.get(url, { headers: { tenantId } });
  }

  updateClassArm(id: any, updateClassArmForm) {
    const tenantId = '1';

    const url = `${this.baseUrl + routes.updateclassarm}/${id}`;
    return this.http.put(url, updateClassArmForm, { headers: { tenantId } } );
  }

  deleteClassArm(id: any) {
    const tenantId = '1';

    const url = `${this.baseUrl + routes.deleteclassarm}/${id}`;
    return this.http.delete(url , { headers: { tenantId } });
  }
}
