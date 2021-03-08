import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../interfaces/account';
import { Transaction } from '../interfaces/transaction';
import { AuthService } from './auth.service';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http:HttpClient,private authService:AuthService,private transactionService:TransactionService) { }

  getAllAccounts():Observable<Account[]>{
    return this.http.get<Account[]>('assets/accounts.json');
  }

  newAccount(newAccount:Account){
    let account=JSON.parse(localStorage.getItem('accounts'));
    if(account.length>0){
      account.forEach(element => {
        if(element.accountNumber===Number(newAccount.accountNumber)) return false;
      });
      account.push(newAccount);
      localStorage.setItem('accounts',JSON.stringify(account));
      return true;
    }
    return false
  }
  
  updateAccountName(accountNumber:number,accountNewName:string){
    let account=JSON.parse(localStorage.getItem('accounts'));
    for (let index = 0; index < account.length; index++) {
      if(account[index].accountNumber===accountNumber){
        account[index].name=accountNewName;
        localStorage.setItem('accounts',JSON.stringify(account))
        return true;
      }
    }
    return false;
  }

  transfer(fromAccountNumber:number,toAccountNumber:number,amount:number){
    const user= this.authService.getCurrentUser();
    if(fromAccountNumber===toAccountNumber) return false;
    
    let account=JSON.parse(localStorage.getItem('accounts'));
    for (let index = 0; index < account.length; index++) {
      if(account[index].accountNumber===fromAccountNumber){
        if(account[index].balance<amount) return false;
        account[index].balance-=amount;
        const newTransactionFrom:Transaction={
          userId:user.userId,
          accountNumber:fromAccountNumber,
          transactionNumber:fromAccountNumber+(Math.random() * (100 - 1) + 1),
          amount:-amount,
          balance:account[index].balance,
          description: `Transfer from Account Number ${fromAccountNumber} to Account number ${toAccountNumber} `
        }
        this.transactionService.newTransaction(newTransactionFrom);
      }else if(account[index].accountNumber===toAccountNumber){
        account[index].balance+=amount
        const newTransactionTo:Transaction={
          userId:user.userId,
          accountNumber:toAccountNumber,
          transactionNumber:toAccountNumber+(Math.floor(Math.random()*(1000-1))+1),
          amount:-amount,
          balance:account[index].balance,
          description: `Transfer from Account Number ${fromAccountNumber} to Account number ${toAccountNumber} `
        }
        this.transactionService.newTransaction(newTransactionTo);
      }
    }
    localStorage.setItem('accounts',JSON.stringify(account))
    return true;
  }

}
