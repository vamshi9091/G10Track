import { TenderService } from './../../service/tender.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from 'src/app/Beans/employee.bean';

@Component({
  selector: 'app-history-track',
  templateUrl: './history-track.component.html',
  styleUrls: ['./history-track.component.css']
})
export class HistoryTrackComponent implements OnInit {

  displayedColumns: string[] = [
    // 'id',
    'actCode',
    // 'userName',
    'description',
    'actTime',
    
    // 'validityDate',
    // 'action',
  ];
  
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // user: User = new User();

  constructor(private router: Router, private dialog: MatDialog, private tenderservice: TenderService) { }

  ngOnInit(): void {
    this.tenderservice.refresh$.subscribe(() => {
      // Logic to refresh payable component
      this.getHistoryTrack();
    });
    this.getHistoryTrack();
  }

  getHistoryTrack() {
    const tenderdata1 = this.tenderservice.getTenderData();
    this.tenderservice.getHistoryTrack(tenderdata1.id).subscribe((data: any) => {
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

  // editEmployee(rowData: any) {
  //   console.log('editEmployee', rowData);
  //   this.employeeservice.setEmployeeRowData(rowData);
  //   this.router.navigate(['home/employee-update']);
  // }

}
