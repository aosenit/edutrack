import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  getSubscriptions: 'schtrack-auth/api/v1/Subscription/GetSubscription',
  addSubscriptions: 'schtrack-auth/api/v1/Subscription/AddSubscription',
  nextSubscriptions: 'schtrack-auth/api/v1/SubscriptionInvoice/GetNextSubsciptionInvoice',
  updatenextSubscriptions: 'schtrack-auth/api/v1/SubscriptionInvoice/PostNextSubsciptionInvoice',
  arrearsSubscriptions: 'schtrack-auth/api/v1/SubscriptionInvoice/GetArrearsSubsciptionInvoice',
  updatearrearsSubscriptions: 'schtrack-auth/api/v1/SubscriptionInvoice​/PostNextSubsciptionInvoice',
};

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  getAllSubscriptions() {
    const url = `${this.baseUrl + routes.getSubscriptions}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  createNewSubscription(payload) {
    const url = `${this.baseUrl + routes.addSubscriptions}`;
    return this.http.post(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getNextSubscriptions(schoolId) {
    const url = `${this.baseUrl + routes.nextSubscriptions}/${schoolId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }


  createNextSubscription(payload) {
    const url = `${this.baseUrl + routes.updatenextSubscriptions}`;
    return this.http.post(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getArrearSubscriptions(schoolId) {
    const url = `${this.baseUrl + routes.arrearsSubscriptions}/${schoolId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }


  createArrearsSubscription(payload) {
    const url = `${this.baseUrl + routes.updatearrearsSubscriptions}`;
    return this.http.post(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }


}
