export class TransactionModeDetailsDto {
    id: number = 0;
    bankname: string = '';
    transactionNumber: string = '';
    checkIssueDate!: Date;
    checkClearDate!: Date;
    checkNumber: string = '';
    dDIssueDate!: Date;
    ddClearDate!: Date;
}