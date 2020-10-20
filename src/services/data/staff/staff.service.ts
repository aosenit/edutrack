import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addstaff: '/Staff/AddStaff',
  getallstaff: '/Staff/GetAllStaffInSchool',
  getstaffbyid: 'Staff/GetStaffById',
  updatestaffbyid: 'Staff/UpdateStaff',
  deletestaff: 'Staff/DeleteStaff'
};


@Injectable({
  providedIn: 'root'
})
export class StaffService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addStaff(form) {
    const url = `${this.baseUrl + routes.addstaff}`;
    return this.http.post(url, form);
  }

  getAllStaffInSchool() {
    const url = `${this.baseUrl + routes.getallstaff}`;
    return this.http.get(this.baseUrl);

  }

  getStaffById(id) {
    const url = `${this.baseUrl + routes.getstaffbyid}/${id}`;
    return this.http.get(id);

  }

  updateStaff(id, updateForm) {
    const url = `${this.baseUrl +  routes.updatestaffbyid}/${id}`;
    return this.http.put(url, updateForm);

  }

  deleteStaffById(id) {
    const url = `${this.baseUrl + routes.deletestaff}/${id}`;
    return this.http.delete(url);

  }

}
