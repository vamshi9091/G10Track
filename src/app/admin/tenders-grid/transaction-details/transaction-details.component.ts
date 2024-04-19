import { Router } from '@angular/router';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OnlineTransactionComponent } from '../online-transaction/online-transaction.component';
import { DDTransactionComponent } from '../dd-transaction/dd-transaction.component';
import { CheckTransactionComponent } from '../check-transaction/check-transaction.component';
import { TransactionDetailsDto } from 'src/app/Beans/transaction-details-dto.bean';
import { TenderService } from '../../service/tender.service';
import { OnlineDto } from 'src/app/Beans/online-dto.bean';
import { DdDto } from 'src/app/Beans/dd-dto.bean';
import { CheckDto } from 'src/app/Beans/check-dto.bean';
import { formatDate } from '@angular/common';
import { BgDto } from 'src/app/Beans/bgdto.bean';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent implements OnInit {
  transactionMode: any = '';
  transactionDetails: TransactionDetailsDto = new TransactionDetailsDto();
  online: OnlineDto = new OnlineDto();
  ddDto: DdDto = new DdDto();
  checkDto: CheckDto = new CheckDto();
  bgDto1:BgDto= new BgDto();
  isRefundable: boolean = false;
    tenderdata:any;
    transactionType:any='';
    transactionFor:any='';

    // bankname:string='';
    // transactionNo:string='';
  @Output() userDepartmentSelected = new EventEmitter<OnlineDto>();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TransactionDetailsComponent>,
    private tenderservice: TenderService,private route: Router
  ) {}

  ngOnInit(): void {
    // const tenderdata1 = this.tenderservice.getTenderData();
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
    //         this.transactionDetails.modeOfTransaction.modeOfTransaction = firstTransactionDetails.modeOfTransaction.modeOfTransaction;
    //         this.transactionDetails.transactionFor = firstTransactionDetails.transactionFor;
    //         this.transactionDetails.recievedFrom = firstTransactionDetails.recievedFrom;
    //         this.transactionDetails.paidTo = firstTransactionDetails.paidTo;
    //     }
    // });
        console.log(this.data.transactionType);  
        this.transactionFor=this.data.transactionType;
        const date1: any = formatDate(new Date(), 'yyyy-MM-dd', 'en');
       
       this.transactionDetails.transactionDate=date1;
       const tenderdata1 = this.tenderservice.getTenderData();
       this.tenderservice.gettransactiondetailbyidForAmount(tenderdata1.id,this.data.transactionType).subscribe((data:any)=>{
        this.transactionDetails.amount=data
        console.log("amount rs",this.transactionDetails.amount)
       })
  }


  onSubmit(){
    if(this.transactionDetails.modeOfTransaction==='Online'){
          // Create a new instance of OnlineDto
          // const onlinedata: OnlineDto = new OnlineDto();
      
          // Assign values to its properties based on your UI input fields
          // onlinedata.bankName = this.bankname;
          // onlinedata.transactionNo = this.transactionNo;
          
          // Assign onlineDto array in transactionDetails
          this.transactionDetails.onlineDto.push(this.online);
    }else if(this.transactionDetails.modeOfTransaction==='DD'){
      this.transactionDetails.ddDto.push(this.ddDto);
    }
    else if(this.transactionDetails.modeOfTransaction==='Check'){
      this.transactionDetails.checkDto.push(this.checkDto)
    }
     else if(this.transactionDetails.modeOfTransaction==='bg'){
      this.transactionDetails.bgDto.push(this.bgDto1)
    }
    const tenderdata1 = this.tenderservice.getTenderData();
    this.transactionDetails.isRefundable=this.isRefundable;
    
    console.log('this.transactionDetails', this.transactionDetails);
    console.log('this.transactionDetails by tender id', tenderdata1.id);
    this.transactionDetails.transactionFor=this.transactionFor;

    
    // this.transactionDetails.Amount=100;
    
    // this.transactionDetails.isRefundable=false;
   
    if (this.transactionDetails) {
    this.tenderservice.posttransactiondetails(tenderdata1.id,this.transactionDetails).subscribe((data:any)=>{
     
    //  this.router.navigate(['tender-update']);

    if (data) {
      console.log("this.listdata", this.transactionDetails);
      console.log('data', data);
      this.dialogRef.close('refresh');
    }else{
      console.log("error")
    }
    })
  }
  }

  modeOfTransactionChange() {
    // if (
    //   this.transactionDetails.modeOfTransaction &&
    //   this.transactionDetails.modeOfTransaction.modeOfTransaction === 'Online'
    // ) {
    //   console.log('this.online', this.transactionMode);
    //   const onlineDialogRef = this.dialog.open(OnlineTransactionComponent, {
    //     width: '50%',
    //   });
    // } else if (
    //   this.transactionDetails.modeOfTransaction &&
    //   this.transactionDetails.modeOfTransaction.modeOfTransaction === 'DD'
    // ) {
    //   console.log('this.dd', this.transactionMode);
    //   const ddDialogRef = this.dialog.open(DDTransactionComponent, {
    //     width: '50%',
    //   });
    // } else if (
    //   this.transactionDetails.modeOfTransaction &&
    //   this.transactionDetails.modeOfTransaction.modeOfTransaction === 'Check'
    // ) {
    //   console.log('this.check', this.transactionMode);
    //   const checkDialogRef = this.dialog.open(CheckTransactionComponent, {
    //     width: '50%',
    //   });
    // }
  }

  // onSubmit() {
  //   if (
  //     this.transactionDetails.modeOfTransaction &&
  //     this.transactionDetails.modeOfTransaction.modeOfTransaction === 'Online'
  //   ) {
  //     const storedData = localStorage.getItem('onlinedto1');
  //     const retrievedArray = storedData ? JSON.parse(storedData) : [];

  //     localStorage.removeItem('dd-Dto');
  //     localStorage.removeItem('checkDto');

  //     this.transactionDetails.modeOfTransaction.ddDto = [];
  //     this.transactionDetails.modeOfTransaction.checkDto = [];
  //     if (retrievedArray.length > 0) {
      
  //       this.transactionDetails.modeOfTransaction.onlineDto = retrievedArray;
  //       console.log(
  //         'onlinedata:',
  //         this.transactionDetails.modeOfTransaction.onlineDto
  //       );
  //     }
  //   } else if (
  //     this.transactionDetails.modeOfTransaction &&
  //     this.transactionDetails.modeOfTransaction.modeOfTransaction === 'DD'
  //   ) {
  //     const ddDtoString = localStorage.getItem('dd-Dto');
  //     const retrievedDDArray = ddDtoString ? JSON.parse(ddDtoString) : [];
  //     localStorage.removeItem('onlinedto1');
  //     localStorage.removeItem('checkDto');

  //     this.transactionDetails.modeOfTransaction.onlineDto = [];
  //     this.transactionDetails.modeOfTransaction.checkDto = [];

  //     if (retrievedDDArray.length > 0) {
  //       this.transactionDetails.modeOfTransaction.ddDto = retrievedDDArray;
  //       console.log(
  //         'ddDtoString',
  //         this.transactionDetails.modeOfTransaction.ddDto
  //       );
  //     }
  //   } else if (
  //     this.transactionDetails.modeOfTransaction &&
  //     this.transactionDetails.modeOfTransaction.modeOfTransaction === 'Check'
  //   ) {
  //     const checkDtoString = localStorage.getItem('checkDto');
  //     const retrievedCheckArray = checkDtoString
  //       ? JSON.parse(checkDtoString)
  //       : [];
  //     localStorage.removeItem('dd-Dto');
  //     localStorage.removeItem('onlinedto1');
  //     this.transactionDetails.modeOfTransaction.ddDto = [];
  //     this.transactionDetails.modeOfTransaction.onlineDto = [];

  //     if (retrievedCheckArray.length > 0) {
       
  //       this.transactionDetails.modeOfTransaction.checkDto =
  //         retrievedCheckArray;

  //       console.log(
  //         'ddDtoString',
  //         this.transactionDetails.modeOfTransaction.checkDto
  //       );
  //     }
  //   }

  //   console.log('this.transactionDetails', this.transactionDetails);

  //   localStorage.setItem(
  //     'TransactionDetails',
  //     JSON.stringify(this.transactionDetails)
  //   );
  //   console.log('Before closing dialog');
  //   this.dialogRef.close();
  //   console.log('After closing dialog');
  // }
}
