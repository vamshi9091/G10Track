import { Employee } from 'src/app/Beans/employee.bean';
// import { UserDeptDto } from './../../../Beans/userdeptdto.bean';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { NotesDto } from 'src/app/Beans/notesdto.beans';
import { TendersDto } from 'src/app/Beans/tenders.bean';
import { TenderService } from '../../service/tender.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { NotesDto } from 'src/app/Beans/notesdto.beans';
import { TendersUpdateDto } from 'src/app/Beans/tenderupdatebean';
import { AuthService } from 'src/app/auth/service/auth.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BomDto } from 'src/app/Beans/bomdto.bean';
import { UserDeptDto } from 'src/app/Beans/userdeptdto.bean';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { OnlineTransactionComponent } from '../online-transaction/online-transaction.component';
import { DDTransactionComponent } from '../dd-transaction/dd-transaction.component';
import { CheckTransactionComponent } from '../check-transaction/check-transaction.component';
import { UserDepartmentGetComponent } from '../user-department-get/user-department-get.component';
import { TransactionDetailsViewComponent } from '../transaction-details-view/transaction-details-view.component';
import { ListService } from '../../service/list.service';
import { EmployeeGetTenderComponent } from '../employee-get-tender/employee-get-tender.component';
import { EmployeeDto } from 'src/app/Beans/employee-dto.bean';
import { TransactionDetailsRecieveComponent } from '../transaction-details-recieve/transaction-details-recieve.component';
import { SavetendersubstatusComponent } from '../savetendersubstatus/savetendersubstatus.component';
@Component({
  selector: 'app-tender-update',
  templateUrl: './tender-update.component.html',
  styleUrls: ['./tender-update.component.css']
})
export class TenderUpdateComponent implements OnInit {


  displayedColumns: string[] = [
    'items',
    'description',
    'quantity',
    'action'
  ];

  bomForm!: FormGroup;
  tenderdto: TendersDto = new TendersDto();
  Notesdto: NotesDto = new NotesDto();
  loggedTime: any;
  id: any;
  notesdata: any = '';
  // Status:any='';
  bom: BomDto = new BomDto();
  boms: BomDto[] = [];
  userDeptDto: UserDeptDto = new UserDeptDto();
  // userDeptDtos: UserDeptDto = ;
  States: any = '';
  Verticals: any = '';
  Status: any = '';
  emdStatus: string = 'unpaid'; 
  docFeeStatus: string = 'unpaid';
  bgStatus: string = 'unpaid';
  transactionfeestatus: string = 'unpaid';
  processingfeestatus: string = 'unpaid';
  corpusfeestatus: string = 'unpaid';
  isDialogOpen: boolean = false;
  tenderdata:any;
  // selectedEmployee:any='';
  selectedEmployee: UserDeptDto | null = null;
  isSubmitting = false;
  roles:any='';
  verticalName:any='';
  SubVerticalsdata:any='';
  Tendername:any='';
  SubTendernamedata:any='';
  // dialogRef: MatDialogRef<TransactionDetailsComponent> | undefined;
  Substatuschanged:any='';
  dataSource: MatTableDataSource<BomDto> = new MatTableDataSource<BomDto>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('bomFormRef') bomFormRef!: NgForm;
  selectedEmployees1: any=''; 

  tenderdata1: any;
  // constructor(private tenderservice: TenderService, public route: Router, private formBuilder: FormBuilder) {
  // }

  constructor(private tenderservice: TenderService, private authservice: AuthService, public route: Router,
    public router: ActivatedRoute, private formBuilder: FormBuilder, private toastr: ToastrService,private ListService:ListService,
    private dialog: MatDialog,private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.bomForm = this.formBuilder.group({
      item: [''],
      description: [''],
      quantity: [''],
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
    const role=localStorage.getItem('userRole');
     console.log("roleis:",role);
      this.roles=role;
    // const tenderdata1 = this.tenderservice.getTenderData();
    // console.log("Tenderdata", tenderdata1);
    // console.log("Tenderdata", tenderdata1.tenderNum);
    this.tenderservice.getStates().subscribe((data: any) => {
      this.States = data;
    })
    // this.tenderservice.getVerticals().subscribe((data: any) => {
    //   this.Verticals = data;
    // })
    // this.tenderservice.getStatus().subscribe((data: any) => {
    //   this.Status = data;
    // })
    this.ListService.getListItemBySysListname('Verticals').subscribe((data: any) => {
      this.Verticals = data;
    })
    this.ListService.getListItemBySysListname('Tender Status').subscribe((data: any) => {
      this.Tendername = data;
    })
    // const authdata=this.authservice.decodedToken();
    // console.log(authdata.sub)
    this.patchFormData();
  
    // this.tenderdto.subverticals = this.tenderdata.subverticals;
    // this.tenderservice.getnotes(tenderdata1.id,).subscribe((data: any) => {
    //   if (data) {
    //     this.notesdata = data;
    //     // this.notesdata=this.notesdata.reverse();
    //     console.log("notesdata", this.notesdata)
    //   }
    // });
this.getNotes();
  }


  onChangeSublistname(event:any){
    if(event){
      
      this.verticalName = event;
      // this.subListName = selectedName;
      console.log("this.VerticalName", this.verticalName);

      if (event) {
        this.ListService.getSubListItemBylistname(event).subscribe((data: any) => {
          this.SubVerticalsdata = data.data;
          console.log("Subverticaldata",this.SubVerticalsdata);
          
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
    }
  }
  // for tender sub status changes
  onChangeSubStatus(eventdata:any){
   
    if(eventdata){
      console.log("status changed to",eventdata)
      this.Substatuschanged=eventdata;
      alert("Add Notes For Sub Status Change")
      const dialogRefs = this.dialog.open(SavetendersubstatusComponent, {
        width: '60%'
      });
      dialogRefs.afterClosed().subscribe(result => {
        if (result === 'refresh') {
          this.getNotes();
        }
      });
      
    }
  }
  // openstatusnotes() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = '60%';
  //   // dialogConfig.height = '77%';
  //   // dialogConfig.data = { transactionType: transactionType };
  //     const dialogRef = this.dialog.open(SavetendersubstatusComponent,dialogConfig) ;
  //     dialogRef.afterClosed().subscribe(result => {
  //       if (result === 'refresh') {
  //         this.getNotes();
  //         // this.patchFormData();
  //         // this.tenderservice.triggerRefresh();
  //       }
  //     });
  //   }


  // patchFormData1() {
  //   const tenderdata1 = this.tenderservice.getTenderData();
   
  //   this.tenderservice.getTendersbyId(tenderdata1.id).subscribe(
  //     (data: any) => {
  //       if (data && data.data) {
  //         this.tenderdata = data.data;
  //         console.log("patchdatafromapithis:", this.tenderdata);
  //         // Assuming tenderdto is already initialized somewhere in your component
  //         if (this.tenderdata.UserDeptDto) {
  //           // Assuming userDeptDto is a property of tenderdto
  //           this.tenderdto.userDeptDto = this.tenderdata.UserDeptDto;
  //           console.log('getting data', this.tenderdto.userDeptDto);
  //         }
  //       } else {
  //         console.error("No data found");
  //       }
  //     },
  //     (error) => {
  //       console.error("Error fetching tender by ID:", error);
  //       // Handle error, show error message, or perform other actions
  //     }
  //   ); }

  patchFormData() {
    const tenderdata1 = this.tenderservice.getTenderData();
    this.tenderservice.getTendersbyId(tenderdata1.id).subscribe((data:any)=>{
      this.tenderdata=data.data;
      console.log("patchdatafromapithis:",this.tenderdata);
      if (this.tenderdata) {
        this.tenderdto.tenderId = this.tenderdata.tenderId;
        console.log("tenderid",this.tenderdata.tenderId)
        this.tenderdto.tenderNum = this.tenderdata.tenderNum;
        this.tenderdto.tenderFloatDate = this.tenderdata.tenderFloatDate;
        this.tenderdto.tenderFloatingDept = this.tenderdata.tenderFloatingDept;

          this.selectedEmployees1 = this.tenderdata.userDeptDto;
        console.log("deptname",this.selectedEmployees1)
        this.tenderdto.states = this.tenderdata.states;
        this.tenderdto.biddingDate = this.tenderdata.biddingDate;
        this.tenderdto.prebidDate = this.tenderdata.prebidDate;
        this.tenderdto.bidOpeningDate = this.tenderdata.bidOpeningDate;
        this.tenderdto.documentFee = this.tenderdata.documentFee;
        this.tenderdto.emd = this.tenderdata.emd;
        this.tenderdto.desc1 = this.tenderdata.desc1;
        this.tenderdto.bg = this.tenderdata.bg;
        this.tenderdto.corpusfee = this.tenderdata.corpusfee;
        this.tenderdto.transactionfee = this.tenderdata.transactionfee;
        this.tenderdto.processingfee = this.tenderdata.processingfee;

        // this.tenderdto.bom = tenderdata.bom;
        this.tenderdto.value = this.tenderdata.value;

        this.tenderdto.verticals = this.tenderdata.verticals;
        this.onChangeSublistname(this.tenderdto.verticals);
        this.tenderdto.subverticals = this.tenderdata.subverticals;

        this.tenderdto.tenderStatus = this.tenderdata.tenderStatus;
        this.onChangeSublistname2(this.tenderdto.tenderStatus);
        this.tenderdto.substatus = this.tenderdata.substatus;
        console.log("tenderstatus,substatus,verticals,subverticals",this.tenderdata.tenderStatus,this.tenderdata.substatus,this.tenderdata.verticals,this.tenderdata.subverticals)
        
         
     

        // this.tenderdto.subverticals = this.tenderdata.subverticals;
        this.tenderdto.assignedTo = this.tenderdata.assignedTo;
        this.tenderdto.url = this.tenderdata.url;
        this.tenderdto.remarks = this.tenderdata.remarks;       
        this.emdStatus=this.tenderdata.emdStatus; 
        this.bgStatus=this.tenderdata.bgStatus;
        this.docFeeStatus=this.tenderdata.docFeeStatus;
        this.corpusfeestatus=this.tenderdata.corpusfeestatus;
        this.processingfeestatus=this.tenderdata.processingfeestatus;
        this.transactionfeestatus=this.tenderdata.transactionfeestatus;

        console.log("status:",this.tenderdata.transactionfeestatus)

        console.log("status:",this.tenderdata.emdStatus)
        // this.tenderdto.notesDto = [...tenderdata.notesDto];
        this.boms = this.tenderdata.bomDto;
        
        this.dataSource = new MatTableDataSource(this.boms);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
    // console.log("Tenderdata", this.tenderdata);
   
  }

  pay(transactionType:string){
    // Set up dialog configuration
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '60%';
  dialogConfig.height = '77%';
  dialogConfig.data = { transactionType: transactionType };
    const dialogRef = this.dialog.open(TransactionDetailsComponent,dialogConfig) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.patchFormData();
        this.tenderservice.triggerRefresh();
      }
    });
    // this.route.navigate(['home/transactiondetailsView']);
    // this.patchFormData();
  }
  paynew(transactionType:string){
    const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '60%';
  dialogConfig.height = '77%';
  dialogConfig.data = { transactionType: transactionType };
  const dialogRef = this.dialog.open(TransactionDetailsRecieveComponent,dialogConfig )
      
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.patchFormData();
        this.tenderservice.triggerRefresh();
      }
    });
  }
  emdStatusChange() {

    if (this.emdStatus === 'paid' && this.emdStatus) {
      console.log('this.emdStatus', this.emdStatus);  
      const dialogRef = this.dialog.open(TransactionDetailsComponent, {
        width: '60%',
        height: '77%'
      });
    }else if(this.docFeeStatus === 'paid' && this.docFeeStatus){
      console.log('this.emdStatus', this.emdStatus);  
      const dialogRef = this.dialog.open(TransactionDetailsComponent, {
        width: '60%',
        height: '82%'
      });
    }else if(this.docFeeStatus === 'paid' && this.docFeeStatus){
      console.log('this.emdStatus', this.emdStatus);  
      const dialogRef = this.dialog.open(TransactionDetailsComponent, {
        width: '60%',
        height: '82%'
      });
    }
  }
  openemdstatusView(){
     this.route.navigate(['home/transactiondetailsView']);
    this.patchFormData();
  }
  onSubmittenderupdate() {
    this.isSubmitting = true;
    const tenderdata = this.tenderservice.getTenderData();
    console.log(tenderdata.id);
    const bomDto1: BomDto[] = this.boms.map(bom => {
      const bomDtos = new BomDto();
      bomDtos.item = bom.item;
      bomDtos.description = bom.description;
      bomDtos.quantity = bom.quantity;
      return bomDtos;
    });
    this.tenderdto.bomDto = bomDto1;

    // let tenderupdatedata = new TendersUpdateDto();
    // tenderupdatedata.bidOpeningDate = this.tenderdto.bidOpeningDate;
    // tenderupdatedata.biddingDate = this.tenderdto.biddingDate;
    // tenderupdatedata.tenderStatus = this.tenderdto.tenderStatus;
    // tenderupdatedata.remarks = this.tenderdto.remarks;

    
     const transcationitem = localStorage.getItem('TransactionDetails');
    if (transcationitem !== null) {
      console.log('transcationitem', JSON.parse(transcationitem));
      // return JSON.parse(transcationitem);
      this.tenderdto.transactionDetailsDto = [JSON.parse(transcationitem)];
    }
        this.tenderdto.emdStatus=this.emdStatus;
        this.tenderdto.bgStatus=this.bgStatus;
        this.tenderdto.docFeeStatus=this.docFeeStatus;
        this.tenderdto.corpusfeestatus=this.corpusfeestatus;
        this.tenderdto.transactionfeestatus=this.transactionfeestatus;
        this.tenderdto.processingfeestatus=this.processingfeestatus;

        


//  Check if selectedEmployee exists and update tenderdto accordingly
//  Check if selectedEmployee exists and update tenderdto accordingly
if (this.selectedEmployees1) {
  if(this.selectedEmployee){
    this.tenderdto.userDeptDto = this.selectedEmployee;
  }else{
  let userDeptDtos = new UserDeptDto();
  userDeptDtos.id = this.tenderdata.userDeptDto.id;

  this.tenderdto.userDeptDto = userDeptDtos;
} }
// this.tenderdto.userDeptDto=this.tenderdata.userDeptDto;

console.log("selectedemployeethis",this.selectedEmployee)
// console.log("selectedemployeesthis",this.selectedEmployees)

// if(!this.selectedEmployee){
//   this.tenderdto.userDeptDto=this.tenderdata.userDeptDto;
// }else if(this.selectedEmployee===this.tenderdata.userDeptDto[0].deptname){
//   this.tenderdto.userDeptDto=[this.selectedEmployee];
// }
const authdata = this.authservice.decodedToken();
    console.log(authdata.sub)
this.tenderdto.userName=authdata.sub;
    console.log("tenderupdatedata", this.tenderdto);

    this.tenderservice.putTender(tenderdata.id,this.tenderdto).subscribe((data: any) => {
      if (data) {
        console.log(data);
        // this.tenderdto = data;
        this.route.navigate(['/home/tender-get'])
      }
    });
    this.isSubmitting=false;
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
  editsRow(row:any):void{
  console.log("rowid",row.id)  
  const dialogRef = this.dialog.open(UserDepartmentGetComponent, {
    width: '60%'
  });
  }

getNotes() {
  
    const tenderdata1 = this.tenderservice.getTenderData();
    const authdata = this.authservice.decodedToken();
    console.log(authdata.sub)
    this.Notesdto.loggedBy = authdata.sub;
    this.tenderservice.getnotes(tenderdata1.id,authdata.sub).subscribe((data: any) => {
      if (data) {
        this.notesdata = data;
        // this.notesdata=this.notesdata.reverse();
        console.log("notesdata", this.notesdata)
      }
    });
  }

  onSubmitnote() {
    console.log("Note:", this.Notesdto.note);
    const tenderdata = this.tenderservice.getTenderData();
    console.log(tenderdata.tenderNum);
    const authdata = this.authservice.decodedToken();
    console.log(authdata.sub)
    this.Notesdto.loggedBy = authdata.sub;
    
// Get the current date and time
    const currentDate = new Date();

// Format the date and time to match the pattern of java.time.LocalDateTime
// const formattedDateTime = FormData(currentDate, "yyyy-MM-dd'T'HH:mm:ss , en");

// Assign the formatted date and time to this.Notesdto.loggedTime
// this.Notesdto.loggedTime = formattedDateTime;

    const logTime: any = formatDate(new Date(), " yyyy-MM-dd'T'HH:mm:ss' ", 'en');
    // const logTime = (loggedTime, 'yyyy-MM-dd HH:mm:ss');

    this.Notesdto.loggedTime = logTime;
  console.log("notes:",this.Notesdto)
    this.tenderservice.postTenderNotes(authdata.sub, tenderdata.id, this.Notesdto).subscribe((data: any) => {
      if (data) {
        console.log('data', data);
        console.log('this.Notesdto', this.Notesdto);
        this.tenderdto = data;
        alert("Your Notes is Sumitted");
        this.getNotes();
        
      }
    });
  }

  // openPopUp() {
  //   const dialogRef = this.dialog.open(UserDepartmentGetComponent, {
  //     width: '60%'
  //   });

  //   dialogRef.componentInstance.userDepartmentSelected.subscribe((selectedEmployee: UserDeptDto) => {
  //     //   const formdata=selectedEmployee
  //     // const userDeptDto =new UserDeptDto();
  //     // userDeptDto.id=formdata.id;
  //     // userDeptDto.deptName=formdata.deptName;
  //     // userDeptDto.address=formdata.address;
  //     // userDeptDto.state=formdata.state;
  //     // userDeptDto.country=formdata.country
  
  //     // this.tenderdto.userDeptDto = userDeptDto;
    
  //     // console.log('Updated userDeptDto:', userDeptDto);
  //     this.selectedEmployee=selectedEmployee;
  //     this.tenderdto.userDeptDto= [selectedEmployee];
  //     console.log('Updated userDeptDto:', this.tenderdto.userDeptDto);
  //     // this.tenderdto.userDeptDto = [userDeptDto];
  //   });
  // }

 
  openPopUp(event: any) {
    event.preventDefault();
    console.log("entering into popup")
    const dialogRef = this.dialog.open(UserDepartmentGetComponent, {
          width: '60%'
        });
        dialogRef.componentInstance.userDepartmentSelected.subscribe((selectedEmployee: UserDeptDto) => {
        this.selectedEmployee=selectedEmployee;
          this.tenderdto.userDeptDto= selectedEmployee;
          this.selectedEmployees1=selectedEmployee.deptName;
          this.selectedEmployees1 = {
            id: selectedEmployee.id,
            deptName: selectedEmployee.deptName,
            address: selectedEmployee.address,
            state: selectedEmployee.state,
            country: selectedEmployee.country
          };
          console.log('Updated openpopup userDeptDto:', selectedEmployee);
          console.log('selectedemployeethis', this.selectedEmployees1);
          // console.log('Updated past data userDeptDto:', this.tenderdto.userDeptDto=[this.tenderdata.userDeptDto.id]);
          // this.tenderdto.userDeptDto = [userDeptDto];
        });
        
  }

  openPopUp2(event: any) {
    event.preventDefault();
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

  openPopUpForEmployee(event: any) {
    event.preventDefault();
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
}
