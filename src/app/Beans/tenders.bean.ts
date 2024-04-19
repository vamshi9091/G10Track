import { BomDto } from "./bomdto.bean";
import { TransactionDetailsDto } from "./transaction-details-dto.bean";
import { UserDeptDto } from "./userdeptdto.bean";
// import { NotesDto } from "./notesdto.beans";

export class TendersDto {
  id: number = 0;
  tenderNum: string = '';
  tenderFloatDate!: Date;
  tenderFloatingDept: string = '';
  // userDept: string = '';
  states: string = '';
  biddingDate!: Date;
  prebidDate!: Date; 
  bidOpeningDate!: Date;
  documentFee: number = 0;
  docFeeStatus: string = '';
  emd: number = 0;
  emdStatus: string = '';
  desc1: string = '';
  bg: number=0;
  // bgExpiryDate!: Date;
  bgStatus: string = '';
  // bom: string = '';
  value: number = 0;
  tenderStatus: string = '';
  substatus: string = '';
  verticals: string = '';
  subverticals:string='';
  assignedTo: string = '';
  url: string = '';
  remarks: string = '';

  transactionfee: number = 0;
  transactionfeestatus: string = '';
  processingfee: number = 0;
  processingfeestatus: string = '';
  corpusfee: number = 0;
  corpusfeestatus: string = '';
  userName:string='';
  bomDto: BomDto[] = [];
  // userDeptDto!: UserDeptDto; 
  userDeptDto: UserDeptDto= new  UserDeptDto(); 
  tenderId:string='';
  // notesDto: NotesDto[] = [];

  transactionDetailsDto:TransactionDetailsDto[]=[];
	

	
}
