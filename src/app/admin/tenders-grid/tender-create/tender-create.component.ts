import { SubListItemDto } from './../../../Beans/sublistitem-dto.bean';
import { ListService } from './../../service/list.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotesDto } from 'src/app/Beans/notesdto.beans';
import { TendersDto } from 'src/app/Beans/tenders.bean';
import { TenderService } from '../../service/tender.service';
import { Router } from '@angular/router';
import { BomDto } from 'src/app/Beans/bomdto.bean';
import { UserDeptDto } from 'src/app/Beans/userdeptdto.bean';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { formatDate } from '@angular/common';
import { UserDepartmentGetComponent } from '../user-department-get/user-department-get.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { EmployeeGetTenderComponent } from '../employee-get-tender/employee-get-tender.component';
import { EmployeeDto } from 'src/app/Beans/employee-dto.bean';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-tender-create',
  templateUrl: './tender-create.component.html',
  styleUrls: ['./tender-create.component.css']
})
export class TenderCreateComponent implements OnInit {
  displayedColumns: string[] = [
    'items',
    'description',
    'quantity',
    'action'
  ];

  bomForm!: FormGroup;
  tenderdto: TendersDto = new TendersDto();
  Notesdto: NotesDto = new NotesDto();
  bom: BomDto = new BomDto();
  boms: BomDto[] = [];
  userDeptDto: UserDeptDto = new UserDeptDto();
  // userDeptDtos: UserDeptDto = ;
  States: any = '';
  Verticals: any = '';
  Status: any = '';
  dataSource: MatTableDataSource<BomDto> = new MatTableDataSource<BomDto>([]);
  userDeptData: number = 0;
  selectedEmployee:UserDeptDto = new UserDeptDto();
  verticalName:any='';
  SubVerticalsdata:any='';
  // Tendername:any="Tender Floated";
  Tendername: any = { data: [{ listItem: 'Tender Floated' }] };
  SubTendernamedata:any='';


 
  // selectedState: string='';
  // states: string[] = [];
  // filteredStates: Observable<string[]> | undefined;
  // stateControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('bomFormRef') bomFormRef!: NgForm;
  roles: any ='';

  constructor(private tenderservice: TenderService, public route: Router, private formBuilder: FormBuilder,
    private dialog: MatDialog,private ListService:ListService,private authservice: AuthService,) {
  }

  ngOnInit(): void {
    this.bomForm = this.formBuilder.group({
      item: [''],
      description: [''],
      quantity: [''],

    })
    this.ListService.getListItemBySysListname('Verticals').subscribe((data: any) => {
      this.Verticals = data;
    })
    this.ListService.getListItemBySysListname('Tender Status').subscribe((data: any) => {
      this.Tendername = data;
    })
    // this.ListService.getSubListItemBylistname("Tender Floated").subscribe((data:any)=>{
    //   this.SubTendernamedata = data.data;
    //   console.log("tenderstatus data", this.SubTendernamedata );
    // })
    const role=localStorage.getItem('userRole');
     console.log("roleis:",role);
      this.roles=role;
      
    console.log("data",this.verticalName)
    this.tenderservice.getStates().subscribe((data: any) => {
      if(data){
        this.States = data.data;
        console.log("states",this.States)
        // this.filteredStates = this.stateControl.valueChanges.pipe(
        //   startWith(''),
        //   map((value: string) => this._filterStates(value))
        // );
      }
     
    })
    this.tenderservice.getStatus().subscribe((data: any) => {
      this.Status = data;
    })

    window.addEventListener('scroll', function() {
      var header = document.getElementById('sticky-header');
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (header) { // Add null check here
        if (scrollTop > 100) {
            header.classList.add('fixed-header');
        } else {
            header.classList.remove('fixed-header');
        }
    }
  });
  }

  onChangeSublistname(event:any){
    if(event){
      
      this.verticalName = event;
      // this.subListName = selectedName;
      console.log("this.VerticalName", this.verticalName);

      if (event) {
        this.ListService.getSubListItemBylistname(event).subscribe((data: any) => {
          this.SubVerticalsdata = data.data;
          console.log("Subverticaldata",this.SubVerticalsdata)
        });
      }
      // console.log("this.subListName", this.subListName);
    }
  }
  onChangeSublistname2(eventdata:any){
    if(eventdata){
       console.log("tenderstatus", eventdata);
       this.tenderdto.tenderStatus = eventdata; 
      // this.subListName = selectedName;
      this.ListService.getSubListItemBylistname(eventdata).subscribe((data:any)=>{
      this.SubTendernamedata = data.data;
      console.log("tenderstatus data", this.SubTendernamedata );
    })
    }else{
      this.ListService.getSubListItemBylistname("Tender Floated").subscribe((data:any)=>{
        this.SubTendernamedata = data.data;
        console.log("tenderstatus data", this.SubTendernamedata );
      })
    }
  }
  onSubmit() { 
    // const bomDto1: BomDto[] = this.boms.map(bom => {
    //   const bomDtos = new BomDto();
    //   bomDtos.item = bom.item;
    //   bomDtos.description = bom.description;
    //   bomDtos.quantity = bom.quantity;
    //   return bomDtos;
    // });

    // this.tenderdto.bomDto = bomDto1;

    const bomDto1: BomDto[] = this.boms.map(bom => {
      const bomDtos = new BomDto();
      bomDtos.item = bom.item;
      bomDtos.description = bom.description;
      bomDtos.quantity = bom.quantity;
      return bomDtos;
    });

    this.tenderdto.bomDto = bomDto1;
    this.tenderdto.transactionfeestatus='unpaid';
    this.tenderdto.processingfeestatus='unpaid';
    this.tenderdto.corpusfeestatus='unpaid';
    this.tenderdto.docFeeStatus='unpaid';
    this.tenderdto.bgStatus='unpaid';
    this.tenderdto.emdStatus='unpaid';
    const authdata = this.authservice.decodedToken();
    console.log(authdata.sub)
    this.tenderdto.userName=authdata.sub;
    console.log("tenderdto:", this.tenderdto);
    this.tenderservice.postTender(this.tenderdto).subscribe((data: any) => {
      if (data) {
        console.log('tender create data', data);
        this.tenderdto = data;
        this.route.navigate(['home/tender-get']);
      }
    });

   
  }


  onSubmits() {
    this.bom.item = this.bomForm.value.item;
    this.bom.description = this.bomForm.value.description;
    this.bom.quantity = this.bomForm.value.quantity;


    this.boms.push(Object.assign({}, this.bom))
    this.dataSource = new MatTableDataSource(this.boms);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.bomFormRef.resetForm();
  }
  removeRow(row: any): void {
    const index = this.boms.indexOf(row);
    if (index !== -1) {
      this.boms.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.boms);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }


  openPopUp() {
    const dialogRef = this.dialog.open(UserDepartmentGetComponent, {
      width: '60%'
    });
    dialogRef.componentInstance.userDepartmentSelected.subscribe((selectedEmployee: UserDeptDto) => {
      console.log('Selected User Department:', selectedEmployee);
    
      const userDeptDto = new UserDeptDto();
      userDeptDto.id = selectedEmployee.id;
      // userDeptDto.deptName = selectedEmployee.deptName;
      // userDeptDto.address = selectedEmployee.address;
      // userDeptDto.state = selectedEmployee.state;
      // userDeptDto.country = selectedEmployee.country;
    
    // this.userDeptDto.id=selectedEmployee.id;
   this.selectedEmployee=selectedEmployee;
      this.tenderdto.userDeptDto= userDeptDto;
      console.log('Updated userDeptDto:', this.tenderdto.userDeptDto);

   
  }  // Rest of the code...
);
  }

  openPopUp2() {
    const dialogRef = this.dialog.open(UserDepartmentGetComponent, {
      width: '60%'
    });
    dialogRef.componentInstance.userDepartmentSelected.subscribe((selectedEmployee: UserDeptDto) => {
      console.log('Selected User Department:', selectedEmployee);
    
      // const userDeptDto = new UserDeptDto();
      // userDeptDto.id = selectedEmployee.id;
      // userDeptDto.deptName = selectedEmployee.deptName;
      // userDeptDto.address = selectedEmployee.address;
      // userDeptDto.state = selectedEmployee.state;
      // userDeptDto.country = selectedEmployee.country;
    
    // this.userDeptDto.id=selectedEmployee.id;
  //  this.selectedEmployee=selectedEmployee;
      this.tenderdto.tenderFloatingDept= selectedEmployee.deptName;
      console.log('Tender Floated Department:', this.tenderdto.tenderFloatingDept);

   
  }  // Rest of the code...
);
  }

  openPopUpForEmployee() {
    // event.preventDefault();
    console.log("entering into popup")
    const dialogRef = this.dialog.open(EmployeeGetTenderComponent, {
          width: '60%'
        });
    
        dialogRef.componentInstance.employeeSelected.subscribe((selectedEmployee1: EmployeeDto) => {
         
          // this.selectedEmployee=selectedEmployee1.name;
          this.tenderdto.assignedTo= selectedEmployee1.name;
          console.log('Selected EMployee:', this.tenderdto.assignedTo);
          // this.tenderdto.userDeptDto = [userDeptDto];
        });
  }


  selectedPaymentOption: any='';
  selectedItems: string[] = [];

  addToSelectedList() {
    if (this.selectedPaymentOption && !this.selectedItems.includes(this.selectedPaymentOption)) {
      this.selectedItems.push(this.selectedPaymentOption);
    }
  }
}
