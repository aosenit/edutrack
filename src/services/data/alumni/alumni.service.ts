import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  getAlumnis: 'schtrack-auth/api/v1/Alumni/GetAllAlumni',
  getAlumnWithId: 'schtrack-auth/api/v1/Alumni/GetAllAlumniById',
  createAlumni: 'schtrack-auth/api/v1/Alumni/AddAlumni',
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


  getAllAlumnis(SessionName, TermName) {
    const url = `${this.baseUrl + routes.getAlumnis}?SessionName=${SessionName}&TermName=${TermName}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllAlumniById() {
    const url = `${this.baseUrl + routes.getAlumnWithId}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createNewAllumni(payload) {
    const url = `${this.baseUrl + routes.createAlumni}`;
    return this.http.post(url, payload, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  createEvent(payload) {
    const body = new FormData();
    body.append('Name', payload.name);
    body.append('Type', payload.type);
    body.append('StartDate', payload.startDate);
    body.append('EndDate', payload.endDate);
    body.append('Location', payload.location);
    body.append('Description', payload.description);
    body.append('Status', payload.status);
    body.append('EventTags', payload.tags);
    body.append('file', payload.eventImg);
    const url = `${this.baseUrl + routes.createEvent}`;
    return this.http.post(url, body, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllEvents() {
    const url = `${this.baseUrl + routes.getAlumnisEvent}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllAlumniEventId(id) {
    const url = `${this.baseUrl + routes.getAlumnisEventWithId}/${id}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  updateEvent(id, payload) {
    const body = new FormData();
    body.append('Name', payload.name);
    body.append('Type', payload.type);
    body.append('StartDate', payload.startDate);
    body.append('EndDate', payload.endDate);
    body.append('Location', payload.location);

    body.append('Description', payload.description);
    body.append('Status', payload.status);
    body.append('EventTags', payload.tags);
    body.append('file', payload.eventImg);
    const url = `${this.baseUrl + routes.updateEvent}/${id}`;
    return this.http.put(url, body, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }
}
