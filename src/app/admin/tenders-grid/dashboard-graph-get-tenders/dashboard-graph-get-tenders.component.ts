import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { TenderService } from '../../service/tender.service';

@Component({
  selector: 'app-dashboard-graph-get-tenders',
  templateUrl: './dashboard-graph-get-tenders.component.html',
  styleUrls: ['./dashboard-graph-get-tenders.component.css']
})
export class DashboardGraphGetTendersComponent implements OnInit {
  statusName: any='';
  dataSource: any;
  sort: any;
  paginator: any;
  displayedColumns: string[] = [
  
'action',
'verticals',
'states',
'tenderNum',
'description',
'tenderStatus',
'biddingDate',

  ];

  constructor(private router: Router, private dialog: MatDialog,public dashservice:DashboardService,public tenderservice:TenderService) {}
  ngOnInit(): void {
    this.statusName =this.dashservice.getStatusName();
    console.log("status name",this.statusName) 
    this.getgraph();
  }

getgraph(){  
  this.tenderservice.gettenderstatuseWithStatusName(this.statusName).subscribe((data: any) => {
    if (data) {
      console.log("data", data.data)
      this.dataSource = new MatTableDataSource(data.data.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
});
}
editTender(rowData: any) {
  console.log('settender', rowData);
  this.tenderservice.setTenderData(rowData);
  this.router.navigate(['home/tender-update']);
}

createTender(): void {
  this.router.navigate(['home/tender-create']);
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
