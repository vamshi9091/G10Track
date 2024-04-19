import { BgDto } from './../../../Beans/bgdto.bean';
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OnlineTransactionComponent } from '../online-transaction/online-transaction.component';
import { DDTransactionComponent } from '../dd-transaction/dd-transaction.component';
import { CheckTransactionComponent } from '../check-transaction/check-transaction.component';
import { TransactionDetailsDto } from 'src/app/Beans/transaction-details-dto.bean';
import { TenderService } from '../../service/tender.service';
import { OnlineDto } from 'src/app/Beans/online-dto.bean';
import { DdDto } from 'src/app/Beans/dd-dto.bean';
import { CheckDto } from 'src/app/Beans/check-dto.bean';

@Component({
  selector: 'app-transaction-details-update',
  templateUrl: './transaction-details-update.component.html',
  styleUrls: ['./transaction-details-update.component.css']
})
export class TransactionDetailsUpdateComponent implements OnInit {
  transactionMode: any = '';
  transactionDetails: TransactionDetailsDto = new TransactionDetailsDto();
  online: OnlineDto = new OnlineDto();
  ddDto: DdDto = new DdDto();
  checkDto: CheckDto = new CheckDto();
  bgDto: BgDto = new BgDto();
  // isRefundable: boolean = false;
    tenderdata:any;
    transactionType:any='';
    transactionFor:any='';

    // bankname:string='';
    // transactionNo:string='';
  @Output() userDepartmentSelected = new EventEmitter<OnlineDto>();
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TransactionDetailsUpdateComponent>,
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
       this.transactiongetpatch();
  }

transactiongetpatch(){
  const rowdata=this.tenderservice.getTransactionrowdata();
  console.log("rowdata",rowdata)
 this.tenderservice.gettransactiondetailbyid(rowdata.id).subscribe((data: any) => {
        this.tenderdata = data.data;
        console.log("patchdatafromapithis:", this.tenderdata);


        if (this.tenderdata) {
          // Patch common transaction details
          this.transactionDetails.title = this.tenderdata.title;
          this.transactionDetails.transactionDate = this.tenderdata.transactionDate;
          this.transactionDetails.description = this.tenderdata.description;
          this.transactionDetails.modeOfTransaction = this.tenderdata.modeOfTransaction;
          this.transactionFor = this.tenderdata.transactionFor;
          this.transactionDetails.amount = this.tenderdata.amount;

            
            switch (this.transactionDetails.modeOfTransaction) {
              case 'Online':
                if (this.tenderdata.onlineDto && this.tenderdata.onlineDto.length > 0) {
                  const onlineData = this.tenderdata.onlineDto[0]; // Assuming you want the first element
                  this.online.bankName = onlineData.bankName;
                  this.online.transactionNo = onlineData.transactionNo;
                }
                break;
                case 'DD':
                  if (this.tenderdata.ddDto && this.tenderdata.ddDto.length > 0) {
                    const ddData = this.tenderdata.ddDto[0]; // Assuming you want the first element
                    this.ddDto.issueDate = ddData.issueDate;
                    this.ddDto.clearDate = ddData.clearDate;
                    this.ddDto.bankName = ddData.bankName;
                  }
                  break;
               
              case 'Check':
          if (this.tenderdata.checkDto && this.tenderdata.checkDto.length > 0) {
            const checkData = this.tenderdata.checkDto[0]; // Assuming you want the first element
            this.checkDto.bankName = checkData.bankName;
            this.checkDto.chequeNumber = checkData.chequeNumber;
            this.checkDto.checkIssueDate = checkData.checkIssueDate;
            this.checkDto.checkCreateDate = checkData.checkCreateDate;
          }
          break;
          case 'bg':
            if (this.tenderdata.bgDto && this.tenderdata.bgDto.length > 0) {
              const bgData = this.tenderdata.bgDto[0]; // Assuming you want the first element
              this.bgDto.bgNumber = bgData.bgNumber;
              this.bgDto.IssueDate = bgData.IssueDate;
              this.bgDto.clearDate = bgData.clearDate;
            }
            break;
          default:
            break;
            }
        }
    });
}
  onSubmit(){
    if(this.transactionDetails.modeOfTransaction==='Online'){
          this.transactionDetails.onlineDto.push(this.online);
    }else if(this.transactionDetails.modeOfTransaction==='DD'){
      this.transactionDetails.ddDto.push(this.ddDto);
    }
    else if(this.transactionDetails.modeOfTransaction==='Check'){
      this.transactionDetails.checkDto.push(this.checkDto)
    }else if(this.transactionDetails.modeOfTransaction==='bg'){
      this.transactionDetails.bgDto.push(this.bgDto)
    }
    const tenderdata1 = this.tenderservice.getTenderData();
    // this.transactionDetails.isRefundable=this.isRefundable;  
    
    console.log('this.transactionDetails', this.transactionDetails);
    console.log('this.transactionDetails by tender id', tenderdata1.id);
    this.transactionDetails.transactionFor=this.transactionFor;

    
    // const tenderdata1=this.tenderservice.getTenderData;
    const rowdata=this.tenderservice.getTransactionrowdata();
    console.log("rowdata",rowdata)
    if (this.transactionDetails) {
    this.tenderservice.updatetransactiondetails(rowdata.id,tenderdata1.id,this.transactionDetails).subscribe((data:any)=>{
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
