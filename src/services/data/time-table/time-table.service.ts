import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addTimeTable: 'schtrack-learning/api/v1/TimeTable/UploadNewTimetableForClass ',
  uploadPeriod : 'schtrack-learning/api/v1/TimeTable/UploadPeriod',
  getPeriods : 'schtrack-learning/api/v1/TimeTable/GetPeriods',
  addTimeTableCell: 'schtrack-learning/api/v1/TimeTable/AddNewTimetableCell',
  addTimeTableBulk: 'schtrack-learning/api/v1/TimeTable/AddTimetableCells',
  getTableforteacher: 'schtrack-learning/api/v1/TimeTable/GetTimetableForTeacher',
  getTableforTeacherByDay: 'schtrack-learning/api/v1/TimeTable/GetAllClassesForTeacherByDay',
  getTableforClassByDay: 'schtrack-learning/api/v1/TimeTable/GetAllClassesForClassToday',
  getTableforClassByClassId: 'schtrack-learning/api/v1/TimeTable/GetTimetableForClass',
  getNextClassesforTeacherByDay: 'schtrack-learning/api/v1/TimeTable/GetNextClassesForTeacherByDay',
  getNextClassesforClassByDay: 'schtrack-learning/api/v1/TimeTable/GetNextClassesForClassToday',
  deleteTableforClass: 'schtrack-learning/api/v1/TimeTable/DeleteTimetableCell',
};

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  createNewTimeTable(timetableform) {
    const url = `${this.baseUrl + routes.addTimeTable}`;
    return this.http.post(url, timetableform);
  }

  createPeriod(periodForm) {
    // const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.uploadPeriod}`;
    return this.http.post(url, periodForm, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getPeriods() {
    // const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getPeriods}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  AddTimeTableCell(result) {
    const tenantId = '1'; // just a temporary header till email services is ready
    // const body = new FormData();
    // body.append('PeriodId', result.PeriodId);
    // body.append('Day', result.Day);
    // body.append('TeacherClassSubjectId', result.TeacherClassSubjectId);
    // body.append('HasVirtual', result.HasVirtual);
    // body.append('NoOfPeriod', result.NoOfPeriod);

    const url = `${this.baseUrl + routes.addTimeTableCell}`;
    return this.http.post(url, result, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  AddTimeTableCellBulk(result) {
    const url = `${this.baseUrl + routes.addTimeTableBulk}`;
    return this.http.post(url, result, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getTimeTableForTeacher() {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getTableforteacher}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }


  getTimeTableForClass() {
    // const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getTableforClassByClassId}`;

    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getTimeTableForClassWithQuery(id) {
    // const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getTableforClassByClassId}?classId=${id}`;

    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getAllClassesForTeacherByDay( day) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getTableforTeacherByDay}?day=${day}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getAllClassesForClassByDay( day) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getTableforClassByDay}?day=${day}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getNextClassessForTeacherByDay(teacherId, day) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getNextClassesforTeacherByDay}?teacherId=${teacherId}&day=${day}`;

    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getNextClassessForClassByDay(classid, day) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getNextClassesforClassByDay}?classid=${classid}&day=${day}`;

    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }


  // deleteTimeTableCell() {
  //   const tenantId = '1'; // just a temporary header till email services is ready

  //   const url = `${this.baseUrl + routes.deleteTableforClass}/15`;
  //   return this.http.delete(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  // }

  //  all these are not yet consumed




}
