import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserDeptDto } from 'src/app/Beans/userdeptdto.bean';
import { UserdepartmentService } from '../../service/userdepartment.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDeptCreateComponent } from '../../settings/user-dept-create/user-dept-create.component';
import { EmployeeService } from '../../service/employee.service';
import { EmployeeDto } from 'src/app/Beans/employee-dto.bean';
import { EmployeeCreateComponent } from '../../Employee-grid/employee-create/employee-create.component';
import { EmployeeCreateTenderComponent } from '../employee-create-tender/employee-create-tender.component';


@Component({
  selector: 'app-employee-get-tender',
  templateUrl: './employee-get-tender.component.html',
  styleUrls: ['./employee-get-tender.component.css']
})
export class EmployeeGetTenderComponent implements OnInit{

 
  
  displayedColumns: string[] = [
    'select',
    // 'imageData',
    'empid',
    'name',
    // 'doj',
    'designation',
    // 'emaiid',
    'phoneNum',
    // 'action',
  ];

  dataSource!: MatTableDataSource<EmployeeDto>;
  selection = new SelectionModel<any>(true, []);
  selectedRow: EmployeeDto | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // user: User = new User();

  @Output() employeeSelected = new EventEmitter<EmployeeDto>();

  constructor(private router: Router, private employeeservice: EmployeeService, private dialogRef: MatDialogRef<EmployeeGetTenderComponent>,private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.user = this.authSevice.getUser();

    this.getEmployeedata();
  }

  getEmployeedata() {
    this.employeeservice.getEmployees().subscribe((data: any) => {
      if (data && data.data) {
        console.log("data", data.data)
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }else{
        alert("First Select State")
        console.log("No data available. Please select a state.");
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

  selectUserDepartment() {
    // const selecteduserdept = this.selection.selected[0];
    // if (selecteduserdept) {
    //   this.employeeSelected.emit(selecteduserdept);
    //   this.dialogRef.close();
    // }
    if (this.selectedRow) {
      this.employeeSelected.emit(this.selectedRow);
      // this.dialogRef.close();
      this.dialogRef.close('refresh');
    }
  }
  selectRow(row: any) {
    this.selectedRow = row;
    }
    

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected() && this.dataSource) {
      this.selection.clear();
      return;
    }

    if (this.dataSource) {
      this.selection.select(...this.dataSource.data);
    }

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserDeptDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    if (this.dataSource) {
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    return '';
  }
  createEmployee(){
    const dialogRef = this.dialog.open(EmployeeCreateTenderComponent, {
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getEmployeedata();
      }
    });
    // this.router.navigate(['home/userdept-create']);
  }
  // checkboxLabel(row?: UserDeptDto): string {
  //   if (!row) {
  //     return '';
  //   }
  //   return `${this.selectedRow === row ? 'selected' : 'not selected'}`;
  // }

}
