import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addparent: '/Parent/AddNewParent  ',
  getallparent: '/Parent/GetAllParents',
  getparentbyid: 'Parent/GetParentById',
  getstudentparent: 'Parent/GetParentsForStudent',
  updateparentbyid: 'Parent/UpdateParent ',
  deleteparent: 'Parent/DeleteParent'
};

@Injectable({
  providedIn: 'root'
})
export class ParentsService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addParent(createParentForm) {
    const url = `${this.baseUrl + routes.addparent}`;
    return this.http.post(url, createParentForm);
  }

  getAllParents() {
    const url = `${this.baseUrl + routes.getallparent}`;
    return this.http.get(url);
  }

  getParentById(id) {
    const url = `${this.baseUrl + routes.getparentbyid}/${id}`;
    return this.http.get(url, id);
  }

  getParentForStudent(studid) {
    const url = `${this.baseUrl + routes.getstudentparent}/${studid}`;
    return this.http.get(url, studid);
  }
  updateParent(id, updateParentForm) {
    const url = `${this.baseUrl + routes.updateparentbyid}/${id}`;
    return this.http.put(url, updateParentForm);

  }

  deleteParentById(id) {
    const url = `${this.baseUrl + routes.deleteparent}/${id}`;
    return this.http.delete(url);

  }
}
