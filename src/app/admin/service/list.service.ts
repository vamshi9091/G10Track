import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubListItemDto } from 'src/app/Beans/sublistitem-dto.bean';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  listrowdata: any;
  tokens: any = '';
 
  baseUrl = environment.apiUrl;
  constructor(public http: HttpClient) {
    this.tokens = localStorage.getItem('token');
  }
  seteditListItem(rowdata: any) {
    this.listrowdata = rowdata;
  }

  geteditListItem() {
    return this.listrowdata;
  }
  public getListItems( data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "list/item-list/"+ data, { headers });
  }

  public getsystemlist( ) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "list/system-list" ,{ headers });
  }

  
  public createSystemListItems(data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(this.baseUrl + "list/savesyslist" , data, { headers });
  }

  
  public createListItems(name:any,data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(this.baseUrl + "list/save-list/"+name, data, { headers });
  }

  createsubListItems(subListName: any, sublistItemdto: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(this.baseUrl + "list/save-sublist/"+subListName, sublistItemdto, { headers });
  
  }
  public updateListItems(id: any, data: any) {
   
    return this.http.post(this.baseUrl + "list/update/" + id, data);
  }

  public updateSubListItems(id: any, data: any) {
   
    return this.http.post(this.baseUrl + "list/updateSubList/" + id, data);
  }
  public getListItemBySysList( sysId: any) {
   
    return this.http.get(`${this.baseUrl}list/system/${sysId}`);
  }

  public getSubListItemBylistname( listname: any) {
   
    return this.http.get(`${this.baseUrl}list/subitem-list/${listname}`);
  }

  public getListItemBySysListname( listname: any) {
   
    return this.http.get(`${this.baseUrl}list/item-list/${listname}`);
  }

}
