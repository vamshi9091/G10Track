import { MatDialog } from '@angular/material/dialog';
import { TransactionDetailsDto } from 'src/app/Beans/transaction-details-dto.bean';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { TenderService } from '../../service/tender.service';
import { EmployeeService } from '../../service/employee.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/Beans/employee.bean';
import { TransactionDetailsUpdateComponent } from '../transaction-details-update/transaction-details-update.component';

@Component({
  selector: 'app-transaction-details-view',
  templateUrl: './transaction-details-view.component.html',
  styleUrls: ['./transaction-details-view.component.css']
})
export class TransactionDetailsViewComponent implements OnInit {
  transactionMode: any = '';
  transactionDetails: TransactionDetailsDto = new TransactionDetailsDto();
    tenderdata:any;


    displayedColumns: string[] = [
      'title',
      // 'transactionType',
      'transactionFor',
      'modeOfTransaction',
      // 'isRefundable',
      'action',

    
    ];
  
    dataSource!: MatTableDataSource<Employee>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  // @Output() userDepartmentSelected = new EventEmitter<OnlineDto>();
  constructor(
    private dialog: MatDialog,
    // private dialogRef: MatDialogRef<TransactionDetailsComponent>,
    private tenderservice: TenderService,
    private router: Router, private employeeservice: EmployeeService
  ) {}

  ngOnInit(): void {
   
    // this.tenderservice.getTendersbyId(tenderdata1.id).subscribe((data: any) => {
    //     this.tenderdata = data.data;
    //     console.log("patchdatafromapithis:", this.tenderdata);
    //     if (this.tenderdata && this.tenderdata.transactionDetailsDto && this.tenderdata.transactionDetailsDto.length > 0) {
    //         const firstTransactionDetails = this.tenderdata.transactionDetailsDto[0]; // Assuming you want to access the first element
    //         this.transactionDetails.title = firstTransactionDetails.title;
    //         console.log("data:", firstTransactionDetails.title)
    //         this.transactionDetails.transactionDate = firstTransactionDetails.transactionDate;
    //         this.transactionDetails.transactionType = firstTransactionDetails.transactionType;
    //         this.transactionDetails.description = firstTransactionDetails.description;
    //         // this.transactionDetails.modeOfTransaction.modeOfTransaction = firstTransactionDetails.modeOfTransaction.modeOfTransaction;
    //         this.transactionDetails.transactionFor = firstTransactionDetails.transactionFor;
    //         this.transactionDetails.recievedFrom = firstTransactionDetails.recievedFrom;
    //         this.transactionDetails.paidTo = firstTransactionDetails.paidTo;
    //     }
    // });

    this.gettransactiondetails();

   
  }

  
 gettransactiondetails(){
  const tenderdata1 = this.tenderservice.getTenderData();
  this.tenderservice.gettransactiondetails(tenderdata1.id).subscribe((data: any) => {
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

  editTransaction(rowData: any) {
    console.log('editEmployee', rowData);
    this.tenderservice.setTransactionrowdata(rowData);
    const dialogRef = this.dialog.open(TransactionDetailsUpdateComponent, {
      width: '60%',
      height: '77%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.gettransactiondetails();
        this.tenderservice.triggerRefresh();
      }
    });
  }

  // createEmployee(): void {
  //   this.router.navigate(['home/employee-create']);
  // }

}
