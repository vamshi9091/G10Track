export class User {
    id: string = '';
    userName: string = '';
    password: string = '';
    email: string = '';
    fullName: string = '';
    phoneNumber: string = '';
    roles: string[] = [];
    isFirstLogin: boolean = false;
    lastPasswordChangeDate!: Date;
    confirmPassword:string=''
}
