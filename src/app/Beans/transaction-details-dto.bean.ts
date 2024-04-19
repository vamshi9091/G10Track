import { BgDto } from "./bgdto.bean";
import { CheckDto } from "./check-dto.bean";
import { DdDto } from "./dd-dto.bean";
import { ModeOfTransactionDto } from "./modeof-transaction-dto.bean";
import { OnlineDto } from "./online-dto.bean";
import { TransactionModeDetailsDto } from "./transaction-mode-deatils-dto.bean";

export class TransactionDetailsDto {
    id: number = 0;
    title: string = '';
    description: string = '';
    transactionDate!: Date;
    transactionType: string = '';
    transactionFor: string = '';
    recievedFrom: string = '';
    paidTo: string = '';
     isRefundable:boolean =false;
    modeOfTransaction: string = '';
    amount:number=0;
    // modeOfTransaction: ModeOfTransactionDto = new ModeOfTransactionDto();
    txnModeDeatilsDto: TransactionModeDetailsDto[] = [];
    ddDto: DdDto[] = [];
    checkDto: CheckDto[] = [];
    onlineDto: OnlineDto[] = [];
    bgDto:BgDto[]=[];
	payablesDto:[] = [];
	receivablesDto:[] = [];
	expiryDate!:Date;
	
	
	
	// private List<PayablesDto> payablesDto;
	// private List<ReceivablesDto> receivablesDto;
	
	// private List<DdDto> ddDto;
	// private List<OnlineDto> onlineDto;
	// private List<CheckDto> checkDto;
}