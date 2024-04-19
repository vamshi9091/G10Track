import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PayableTendersComponent } from '../tenders-grid/payable-tenders/payable-tenders.component';
import { RecivebleTendersComponent } from '../tenders-grid/reciveble-tenders/reciveble-tenders.component';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  

  tokens: any = '';
  tenderdata: any = '';
  baseUrl = environment.apiUrl;
  transactionrowdata: any;

  constructor(public http: HttpClient) {
    const bearerToken = 'your-bearer-token';
    this.tokens = localStorage.getItem('token');
  }

  //  const authToken = this.authService.getToken();
  public getTender() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "tenders/get", { headers });
  }
  public getTendersbyId(id:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "tenders/gettenderbyid/"+ id, { headers });
  }
  public postTender(data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(this.baseUrl + "tenders/save", data, { headers });
  }

  public putTender(id: any, data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(this.baseUrl + "tenders/update/" + id, data, { headers });
  }

  public postTenderNotes(userName: any, tendernum: any, data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(this.baseUrl + `notes/notessave/${userName}/${tendernum}`, data, { headers });
  }

  public getnotes(id: any,name:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "notes/note/" + id + "/" + name, { headers });
  }
// /note/{id}/{name}
  setTenderData(rowdata: any) {
    this.tenderdata = rowdata;
  }

  getTenderData() {
    return this.tenderdata;
  }

  public getStates() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "tenders/states", { headers });
  }

  public getVerticals() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "tenders/verticals", { headers });
  }

  public getStatus() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "tenders/tender-status", { headers });
  }

  public getLiveTendersByStatus() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(`${this.baseUrl}tenders/live-tenders`, { headers });
  }
  // ----create transaction----
  public posttransactiondetails(id:any,data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(this.baseUrl + `tenders/txn-update/${id}`, data, { headers });
  }
  public postReceivetransactiondetails(id:any,data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(this.baseUrl + `tenders/txn-receivables/${id}`, data, { headers });
  }
// update transaction
public updatetransactiondetails(id:any,tendernum:any,data:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.post(this.baseUrl + `tenders/update-txn/${id}/${tendernum}`, data, { headers });
}
// /tenders/update-txn/{id}/{tenderNum}
  public gettransactiondetails(tenderid:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + `tenders/get-transactions/${tenderid}`, { headers });
  }

  public gettransactiondetailbyid(transactionid:any) { 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + `tenders/get-details/${transactionid}`, { headers });
  }
  
  public getPayablerecords(tenderid:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(`${this.baseUrl}payables/get-payables/${tenderid}`, { headers });
  }
  public getRecivebleRecords(tenderid:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(`${this.baseUrl}receivables/get-receivables/${tenderid}`, { headers });
  }

  public getHistoryTrack(tenderid:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(`${this.baseUrl}actentry/get/${tenderid}`, { headers });
  }

  public gettenderstatuseWithStatusName(tenderStatus:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(`${this.baseUrl}tenders/tenders-get/${tenderStatus}`, { headers });
  }
  public getParticipatednormalget() {
   
    // return this.http.get(`${this.baseUrl}`);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "tenders/participated", { headers });
  }
 
  public gettenderstatuseWithStatusName1(tenderStatus:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(`${this.baseUrl}tenders/tendersSubList-get/${tenderStatus}`, { headers });
  }
  public gettransactiondetailbyidForAmount(tenderid:any,feeType:any) { 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + `tenders/get-amount/${tenderid}?feeType=${feeType}`, { headers }).pipe(
      map((response:any) => {
        // Check if the response contains the requested fee type
        if (response.hasOwnProperty(feeType)) {
          return response[feeType]; // Return the value if fee type exists
        } else {
          throw new Error('Fee type not found in response');
        }
      })
    );
  }
  

  setTransactionrowdata(rowData: any) {
    this.transactionrowdata=rowData
  }
  getTransactionrowdata(){
    return this.transactionrowdata;
  }
  // ------------------for getting refresh for tabs (in tabs we given PayableTendersComponent and RecivebleTendersComponent)---
  private refreshSubject = new Subject<void>();

  refresh$ = this.refreshSubject.asObservable();

  triggerRefresh() {
    this.refreshSubject.next();
  }
//  ------close for tabs refresh-----------

 
}
