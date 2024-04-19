import { CheckDto } from "./check-dto.bean";
import { DdDto } from "./dd-dto.bean";
import { OnlineDto } from "./online-dto.bean";

export class ModeOfTransactionDto {
    id: number = 0;
    modeOfTransaction: string = '';
    ddDto: DdDto[] = [];
    checkDto: CheckDto[] = [];
    onlineDto: OnlineDto[] = [];
}