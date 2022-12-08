import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  termianlClasses: 'schtrack-auth/api/v1/Class/GetClassesWithoutArm',
  promotionMethod: 'schtrack-assessment/api/v1/Enums/PromotionMethod',
  promotionType: 'schtrack-assessment/api/v1/Enums/PromotionType',
  promotionSetup: 'schtrack-assessment/api/v1/PromotionSetup/GetPromotionSetup',
  withdrawalSetup: 'schtrack-assessment/api/v1/PromotionSetup/GetWithdrawalSetup',
  editPromotionSetup: 'schtrack-assessment/api/v1/PromotionSetup/AddOrUpdatePromotionSetup',
  editWithdrawalSetup: 'schtrack-assessment/api/v1/PromotionSetup/AddOrUpdateWithdrawalSetup',
  editTerminalclasses: 'schtrack-auth/api/v1/Class/UpdateClassSequenceAndTerminal',

  classPool: 'schtrack-auth/api/v1/Promotion/GetClassPool',
  repeatList: 'schtrack-auth/api/v1/Promotion/GetRepeatList',
  withdrawnList: 'schtrack-auth/api/v1/Promotion/GetWithdrawnList',
  promotionHighlight: 'schtrack-auth/api/v1/Promotion/GetPromotionHighlight',
  submitReasons: 'schtrack-auth/api/v1/Promotion/PostClassPool',

  submitResultsForPromotion: 'schtrack-assessment/api/v1/Promotion',
  promoteAllStudents: 'schtrack-auth/api/v1/Promotion/PromoteAllStudent',
};


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  getAllTerminalClasses() {
    const url = `${this.baseUrl + routes.termianlClasses}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getPromotionType() {
    const url = `${this.baseUrl + routes.promotionType}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  getPromotionMethod() {
    const url = `${this.baseUrl + routes.promotionMethod}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  getPromotionSetup() {
    const url = `${this.baseUrl + routes.promotionSetup}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getWithdrawalSetup() {
    const url = `${this.baseUrl + routes.withdrawalSetup}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  updatePromotionSetup(payload) {
    const url = `${this.baseUrl + routes.editPromotionSetup}`;
    return this.http.post(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  updateWithdrawalSetup(payload) {
    const url = `${this.baseUrl + routes.editWithdrawalSetup}`;
    return this.http.post(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  updateTerminalClassSetup(payload) {
    const url = `${this.baseUrl + routes.editTerminalclasses}`;
    return this.http.put(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getClassPool(sessionId, classId?: any) {
    const url = `${this.baseUrl + routes.classPool}/${sessionId}?classId=${classId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getRepeatersList(sessionId,  classId?: any) {
    const url = `${this.baseUrl + routes.repeatList}/${sessionId}?classId=${classId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getWithDrawnList(sessionId,  classId?: any) {
    const url = `${this.baseUrl + routes.withdrawnList}/${sessionId}?classId=${classId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getPromotionHighlight(sessionId, classId?: any) {
    const url = `${this.baseUrl + routes.promotionHighlight}/${sessionId}?classId=${classId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  postReasons(payload) {
    const url = `${this.baseUrl + routes.submitReasons}`;
    return this.http.post(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  submitAllResultsForPromotion(payload) {
    const url = `${this.baseUrl + routes.submitResultsForPromotion}`;
    return this.http.post(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  curateActualPromotion(payload) {
    const url = `${this.baseUrl + routes.promoteAllStudents}`;
    return this.http.post(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

}
