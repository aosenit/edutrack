import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  getAlumnis: 'schtrack-auth/api/v1/Alumni/GetAllAlumni',
  getAlumnWithId: 'schtrack-auth/api/v1/Alumni/GetAllAlumniById',
  updateAlumi: 'schtrack-auth/api/v1/Alumni/UpdateAlumni',
  createEvent: 'schtrack-auth/api/v1/AlumniEvent/AddEvent',
  getAlumnisEvent: 'schtrack-auth/api/v1/AlumniEvent/GetAllEvents',
  getAlumnisEventWithId: 'schtrack-auth/api/v1/AlumniEvent/GetEventById',
  updateEvent: 'schtrack-auth/api/v1/AlumniEvent/UpdateEventById',
};

@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  baseUrl = environment.serverUrl;
  baseUrl2: string = environment.demourl;


  constructor(private http: HttpClient) { }


  getAllAlumnis() {
    const url = `${this.baseUrl + routes.getAlumnis}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllAlumniById() {
    const url = `${this.baseUrl + routes.getAlumnWithId}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createEvent(payload) {
    const url = `${this.baseUrl + routes.createEvent}`;
    return this.http.post(url, payload, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllEvents() {
    const url = `${this.baseUrl + routes.getAlumnisEvent}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllAlumniEventId() {
    const url = `${this.baseUrl + routes.getAlumnisEventWithId}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  updateEvent(id, payload) {
    const url = `${this.baseUrl + routes.getAlumnWithId}/${id}`;
    return this.http.put(url, payload, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }
}
