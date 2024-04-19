import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TendersDto } from 'src/app/Beans/tenders.bean';
import { TenderService } from '../../service/tender.service';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-dashboard-notawarded-tenders-get',
  templateUrl: './dashboard-notawarded-tenders-get.component.html',
  styleUrls: ['./dashboard-notawarded-tenders-get.component.css']
})
export class DashboardNotawardedTendersGetComponent implements OnInit  {

  displayedColumns: string[] = [
    // 'id',
'action',
'verticals',
'states',
'tenderNum',
'description',
'tenderStatus',
'biddingDate',
// 'prebidDate',
// 'tenderFloatingDept', 
// 'userDept',
// 'bidOpeningDate',
// 'documentFee',
// 'emd',  
// 'bg',
// // 'bom',
// 'value',
// 'assignedTo',
// 'tenderFloatDate',
// 'url',
// 'remarks',
  ];

  dataSource!: MatTableDataSource<TendersDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // user: User = new User();

  constructor(private router: Router, private dialog: MatDialog, private tenderservice: TenderService,private dashService: DashboardService) { }

  ngOnInit(): void {
  
    this.gettenderData();
  }

  gettenderData() {
    const vertical = this.dashService.getVertical();
     const state = this.dashService.getState();
    const fromDate = this.dashService.getfromDate();
    const toDate = this.dashService.getToDate();


    if (vertical && state && fromDate && toDate) {
      this.dashService.getNotAwardedDateStateVetical(vertical,state, fromDate,toDate,["Disqualified PQ", "Disqualified TQ"]).subscribe((data: any) => {
        if (data) {
          console.log("data", data.data)
          this.dataSource = new MatTableDataSource(data.data.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    } else if (vertical && state) {
      this.dashService.getNotAwardedStateVertical( vertical,state,["Disqualified PQ", "Disqualified TQ"]) .subscribe((data: any) => {
        if (data) {
          console.log("data", data.data)
          this.dataSource = new MatTableDataSource(data.data.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
  
    } else if (state && fromDate && toDate) {
      this.dashService.getNotAwardedDateState(state,fromDate,toDate,["Disqualified PQ", "Disqualified TQ"]) .subscribe((data: any) => {
        if (data) {
          console.log("data", data.data)
          this.dataSource = new MatTableDataSource(data.data.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
   
    } else if (vertical && fromDate && toDate) {
      this.dashService.getNotAwardedDateVertical(vertical,fromDate,toDate,["Disqualified PQ", "Disqualified TQ"]).subscribe((data: any) => {
        if (data) {
          console.log("data", data.data)
          this.dataSource = new MatTableDataSource(data.data.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
      
    } else if (vertical) {
      this.dashService.getNotAwardedVertical(vertical,["Disqualified PQ", "Disqualified TQ"]).subscribe((data: any) => {
        if (data) {
          console.log("data", data.data)
          this.dataSource = new MatTableDataSource(data.data.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
     
    } else if (state) {
      this.dashService.getNotAwardedState(state,["Disqualified PQ", "Disqualified TQ"]).subscribe((data: any) => {
        if (data) {
          console.log("data", data.data)
          this.dataSource = new MatTableDataSource(data.data.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
     
    } else if (fromDate && toDate) {
      this.dashService.getNotAwardedDate(fromDate,toDate,["Disqualified PQ", "Disqualified TQ"]).subscribe((data: any) => {
        if (data) {
          console.log("data", data.data)
          this.dataSource = new MatTableDataSource(data.data.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
      
    }else {
      this.tenderservice.gettenderstatuseWithStatusName1(["Disqualified PQ", "Disqualified TQ"]).subscribe((data: any) => {
        if (data) {
          console.log("data", data.data)
          this.dataSource = new MatTableDataSource(data.data.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
      
    }

   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // viewClient(data: any) {
  //   this.dialog.open(ClientViewComponent, {
  //     width: '50%',
  //     data: data
  //   })
  // }

  editTender(rowData: any) {
    console.log('settender', rowData);
    this.tenderservice.setTenderData(rowData);
    this.router.navigate(['home/tender-update']);
  }

  createTender(): void {
    this.router.navigate(['home/tender-create']);
  }


}

