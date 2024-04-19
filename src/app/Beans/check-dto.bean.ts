export class CheckDto {
    id: number = 0;
    bankName: string = '';
    chequeNumber: string = '';
    checkIssueDate!: Date;
    checkCreateDate!: Date;
}