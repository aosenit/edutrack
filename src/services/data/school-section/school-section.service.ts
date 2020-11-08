import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolSectionService {
  baseurl: string = environment.serverUrl;
  constructor(private http: HttpClient) { }


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
  }
}
