import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from 'src/app/Beans/employee.bean';
import { TenderService } from '../../service/tender.service';
import { TransactionDetailsRecieveComponent } from '../transaction-details-recieve/transaction-details-recieve.component';


@Component({
  selector: 'app-reciveble-tenders',
  templateUrl: './reciveble-tenders.component.html',
  styleUrls: ['./reciveble-tenders.component.css']
})
export class RecivebleTendersComponent implements OnInit {

  displayedColumns: string[] = [
    'type',
    'status',
    'amount',
    // 'validityDate',
    'expiryDate',
    'action',
  ];

  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // user: User = new User();

  constructor(private router: Router, private dialog: MatDialog, private tenderservice: TenderService) { }

  ngOnInit(): void {
    this.tenderservice.refresh$.subscribe(() => {
      // Logic to refresh payable component
      this.getRecivebleRecord();
    });
    this.getRecivebleRecord();
  }

  getRecivebleRecord() {
    const tenderdata1 = this.tenderservice.getTenderData();
    this.tenderservice.getRecivebleRecords(tenderdata1.id).subscribe((data: any) => {
      if (data) {
        console.log("data", data.data)
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // viewEmployee(data: any) {
  //   this.dialog.open(ClientViewComponent, {
  //     width: '50%',
  //     data: data
  //   })
  // }



  editEmployee(rowData: any){
    console.log('editEmployee', rowData.type);
    const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '60%';
  dialogConfig.height = '77%';
  dialogConfig.data = { transactionType: rowData.type };
  const dialogRef = this.dialog.open(TransactionDetailsRecieveComponent,dialogConfig )
      
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
       
        // this.tenderservice.triggerRefresh();
      }
    });
  }
}

