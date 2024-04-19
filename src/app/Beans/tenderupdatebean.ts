import { BomDto } from "./bomdto.bean";
import { TransactionDetailsDto } from "./transaction-details-dto.bean";
import { UserDeptDto } from "./userdeptdto.bean";

export class TendersUpdateDto {
  
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
  // emdStatus: string = '';
  desc1: string = '';
  bg: number=0;
  bgExpiryDate!: Date;
  bgStatus: string = '';
  // bom: string = '';
  value: number = 0;
  tenderStatus: string = '';
  verticals: string = '';
  assignedTo: string = '';
  url: string = '';
  remarks: string = '';
  userName:string='';
  bomDto: BomDto[] = [];
  userDeptDto: UserDeptDto[]=[] ; 
  // notesDto: NotesDto[] = [];

  transactionDetailsDto:TransactionDetailsDto[]=[];
   
}

