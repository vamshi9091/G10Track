import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TenderService } from '../../service/tender.service';
import { TendersDto } from 'src/app/Beans/tenders.bean';

@Component({
  selector: 'app-tenders-get',
  templateUrl: './tenders-get.component.html',
  styleUrls: ['./tenders-get.component.css'],
})
export class TendersGetComponent implements OnInit {
  
  displayedColumns: string[] = [
    // 'id',
    'action',
    'verticals',
    'states',
    'tenderNum',
    'description',
    'tenderStatus',
    'biddingDate',
    'assignedTo',
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

  constructor(private router: Router, private dialog: MatDialog, private tenderservice: TenderService) { }

  ngOnInit(): void {
    // this.clientService.getAllClients(this.user.orgId).subscribe((data: any) => {
    //   if (data) {
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //   }
    // });
    this.gettenderData();
  }

  gettenderData() {
    this.tenderservice.getTender().subscribe((data: any) => {
      if (data) {
        console.log("data", data.data)
        this.dataSource = new MatTableDataSource(data.data.reverse());
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
