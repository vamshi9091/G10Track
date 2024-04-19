import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from 'src/app/Beans/employee.bean';

@Component({
  selector: 'app-employee-get',
  templateUrl: './employee-get.component.html',
  styleUrls: ['./employee-get.component.css']
})
export class EmployeeGetComponent implements OnInit {

  displayedColumns: string[] = [
    // 'imageData',
    // 'empid',
    'name',
    'doj',
    'role',
    'emaiid',
    'phoneNum',
    'action',
  ];

  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // user: User = new User();

  constructor(private router: Router, private dialog: MatDialog, private employeeservice: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployeedata();
  }

getEmployeedata() {
    this.employeeservice.getEmployees().subscribe((data: any) => {
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

editEmployee(rowData: any) {
    console.log('editEmployee', rowData);
    this.employeeservice.setEmployeeRowData(rowData);
    this.router.navigate(['home/employee-update']);
  }

  createEmployee(): void {
    this.router.navigate(['home/employee-create']);
  }
}
