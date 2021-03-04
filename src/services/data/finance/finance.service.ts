import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addBankAccount: 'schtrack-finance/api/v1/BankAccount/NewBankAccount',
  getbankAccount: 'schtrack-finance/api/v1/BankAccount/GetBankAccounts',
  getbankAccountwithId: 'schtrack-finance/api/v1/BankAccount/GetBankAccount',
  udatebankAccountwithId: 'schtrack-finance/api/v1/BankAccount/UpdateBankAccount',
  addAccountclass: 'schtrack-finance/api/v1/AccountClass/NewAccountClass',
  getAccountclass: 'schtrack-finance/api/v1/AccountClass/GetAccountClasses',
  addAccounttype: 'schtrack-finance/api/v1/AccountType/NewAccountType',
  getAccountTypes: 'schtrack-finance/api/v1/AccountType/GetAccountTypes',
  getAccountTypesbyId: 'schtrack-finance/api/v1/AccountType/GetAccountTypees',
  createAccount: 'schtrack-finance/api/v1/Account/NewAccount',
  getChartAccount: 'schtrack-finance/api/v1/Account/GetAccounts',
  addfeeGruop: 'schtrack-finance/api/feeGroup',
  getallfeeGruop: 'schtrack-finance/api/getFees',
  createComponent: 'schtrack-finance/api/Component/NewComponent',

};

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  createNewBankAccount(newAccountData) {
    const url = `${this.baseUrl + routes.addBankAccount}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllBankAccount(p, perpage) {
    const url = `${this.baseUrl + routes.getbankAccount}?PageIndex=${p}&PageSize=${perpage}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getBankAccountById(id) {
    const url = `${this.baseUrl + routes.getbankAccountwithId}/${id}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  updateBankAccountById(id, updateDataForm) {
    const url = `${this.baseUrl + routes.udatebankAccountwithId}/${id}`;
    return this.http.put(url, updateDataForm, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createNewAccountClass(newAccountData) {
    const url = `${this.baseUrl + routes.addAccountclass}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllAccountClass() {
    const url = `${this.baseUrl + routes.getAccountclass}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createNewAccountType(newAccountData) {
    const url = `${this.baseUrl + routes.addAccounttype}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllAccountType() {
    const url = `${this.baseUrl + routes.getAccountTypes}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAccountTypeById(id) {
    const url = `${this.baseUrl + routes.getAccountTypesbyId}/${id}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createNewChartAccount(newAccountData) {
    const url = `${this.baseUrl + routes.createAccount}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllChartOfAccount() {
    const url = `${this.baseUrl + routes.getChartAccount}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createFeeGroup(feegroupdata) {
    const url = `${this.baseUrl + routes.addfeeGruop}`;
    return this.http.post(url, feegroupdata,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllFeeGroup() {
    const url = `${this.baseUrl + routes.addfeeGruop}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createNewComponent(componentData) {
    const url = `${this.baseUrl + routes.createComponent}`;
    return this.http.post(url, componentData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }
 }
