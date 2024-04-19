import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  tokens: any = '';
  private vertical!: string;
  private state!: string;
  private fromdate!: Date;
  private todate!: Date;

  baseUrl = environment.apiUrl;
  statusName: any;
  constructor(public http: HttpClient) {
    this.tokens = localStorage.getItem('token');
  }

  public getAllData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "tenders/defaultfetch" , { headers });
  }
  // --- by giving input we will gwt dashboard data ----
  public getAllDataByVerticals(vertical: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "tenders/get/" + vertical, { headers });
  }
  public getAllDataByStates(states: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "tenders/state/" + states, { headers });
  }

  public getAllDataByStatesAndVerticals(states: any, verticals: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(`${this.baseUrl}tenders/fetch/${states}/${verticals}`, { headers });
  }
 
  public getAllDataByStatesAndVerticalsandDate(states: any, verticals: any,fromdate: any, todate: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(`${this.baseUrl}tenders/fetchStatesVerticalsMonth/${states}/${verticals}/${fromdate}/${todate}`, { headers });
  }

  public getAllDataByVerticalsandDate( verticals: any,fromDate: any, toDate: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(`${this.baseUrl}tenders/fetchVerticalsMonth/${verticals}/${fromDate}/${toDate}`, { headers });
  }
  public getAllDataByStateandDate( states: any,fromDate: any, toDate: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(`${this.baseUrl}tenders/fetchStatesMonth/${states}/${fromDate}/${toDate}`, { headers });
  }
  // /fetchMonth/{fromDate}/{toDate}
  public getAllDataByDate(fromDate: any, toDate: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(`${this.baseUrl}tenders/fetchMonth/${fromDate}/${toDate}`, { headers });
  }

  // --- close ----


  public getGraphstatus(){
    return this.http.get(this.baseUrl +"tenders/tender-status/count")
  }

  // /tender/status/count/{fromDate}/{toDate}
  
  public getGraphMonthstatus(fromdate:any,todate:any){
    return this.http.get(this.baseUrl +"tenders/tender/status/count/" + fromdate +"/"+todate)
  }
//set and get for vertical and state and date for selecting input names
  setVertical(vertical: string) {
    this.vertical = vertical;
  }
  getVertical(): string {
    return this.vertical;
  }
  setState(state: string) {
    this.state = state;
  }
  getState(): string {
    return this.state;
  }
  setfromDate(date: Date) {
    this.fromdate = date;
  }
  getfromDate(): Date {
    return this.fromdate;
  }
  setToDate(date: Date) {
    this.todate = date;
  }
  getToDate(): Date {
    return this.todate;
  }
//close

//fetch data of alltenders and awarded tenders

///alltenders
public gettabledataVertical( verticals: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tenders/${verticals}`, { headers });
}
public gettabledataState(states: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tenderss/${states}`, { headers });
}

public gettabledataDate(fromDate: any,toDate:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tendersbymonth/${fromDate}/${toDate}`, { headers });
}

public gettableStateVertical(states: any, verticals: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tendersss/${states}/${verticals}`, { headers });
}

public gettableDateVertical(verticals: any,fromDate: any,toDate:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tendersbyVerticalsAndmonth/${verticals}/${fromDate}/${toDate}`, { headers });
}
	
public gettableDateState(states: any,fromDate: any,toDate:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tendersbyMonthAndStates/${states}/${fromDate}/${toDate}`, { headers });
}



public gettableDateStateVetical(states: any, verticals: any,fromDate: any,toDate:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tendersbyMonthAndStatesAndVerticals/${states}/${verticals}/${fromDate}/${toDate}`, { headers });
}

//awarded tenders 

public getAwardedDateStateVetical(states: any, verticals: any,fromDate: any,toDate:any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tenderssss/${states}/${verticals}/${fromDate}/${toDate}/${tenderstatus}`, { headers });
}

public getAwardedStateVertical(states: any, verticals: any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tendersss/${states}/${verticals}/${tenderstatus}`, { headers });
}

public getAwardedDateVertical(verticals: any,fromDate: any,toDate:any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tenderssssss/${verticals}/${fromDate}/${toDate}/${tenderstatus}`, { headers });
}

	
public getAwardedDateState(states: any,fromDate: any,toDate:any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tendersssssss/${states}/${fromDate}/${toDate}/${tenderstatus}`, { headers });
}

public getAwardedVertical( verticals: any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tenderssss/${verticals}/${tenderstatus}`, { headers });
}
public getAwardedState(states: any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tender/${states}/${tenderstatus}`, { headers });
}

public getAwardedDate(fromDate: any,toDate:any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/get-tendersbymonth/${fromDate}/${toDate}/${tenderstatus}`, { headers });
}

//participated

public getParticipatedDateStateVetical(fromDate: any,toDate:any, verticals: any,states: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/participatdddd/${fromDate}/${toDate}/${verticals}/${states}`, { headers });
}

public getParticipatedStateVertical(verticals: any,states:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/participatddd/${verticals}/${states}`, { headers });
}

public getParticipatedDateVertical(fromDate: any,toDate:any,verticals: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/participatedd/${fromDate}/${toDate}/${verticals}`, { headers });
}

	
public getParticipatedDateState(fromDate: any,toDate:any,states: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/participateddd/${fromDate}/${toDate}/${states}`, { headers });
}

public getParticipatedVertical( verticals: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/participat/${verticals}`, { headers });
}
public getParticipatedState(states: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/participate/${states}`, { headers });
}

public getParticipatedDate(fromDate: any,toDate:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/participatee/${fromDate}/${toDate}`, { headers });
}

// not awareded tenders

public getNotAwardedDateStateVetical( verticals: any,states: any,fromDate: any,toDate:any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/tendersNotAward/${verticals}/${states}/${fromDate}/${toDate}/${tenderstatus}`, { headers });
}

public getNotAwardedStateVertical( verticals: any,states: any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/tendersNotAwardddd/${verticals}/${states}/${tenderstatus}`, { headers });
}

public getNotAwardedDateVertical(verticals: any,fromDate: any,toDate:any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/tendersNotAwarddd/${verticals}/${fromDate}/${toDate}/${tenderstatus}`, { headers });
}


public getNotAwardedDateState(states: any,fromDate: any,toDate:any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/tendersNotAwardd/${states}/${fromDate}/${toDate}/${tenderstatus}`, { headers });
}

public getNotAwardedVertical( verticals: any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/tendersNotAwardeddd/${verticals}/${tenderstatus}`, { headers });
}

public getNotAwardedState(states: any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/tendersNotAwardedd/${states}/${tenderstatus}`, { headers });
}

public getNotAwardedDate(fromDate: any,toDate:any,tenderstatus:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/tendersNotAwarded/${fromDate}/${toDate}/${tenderstatus}`, { headers });
}

setStatusName(data: any) {
  this.statusName = data;
}

getStatusName() {
  return this.statusName;
}

GraphTendersGet(statusname:any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.tokens}`
  });
  return this.http.get(`${this.baseUrl}tenders/tendersNotAwarded/${statusname}`, { headers });

}

}
