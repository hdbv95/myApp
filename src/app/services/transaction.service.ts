import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable}from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from '../interfaces/transaction';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  getAllTrasnsactionsByAccountId(accountNumber:number):Observable<Transaction[]>{
    const user = this.authService.getCurrentUser();
    return this.http.get<Transaction[]>('assets/movements.json').pipe(
      map(transactions=>transactions.filter((transactions) => transactions.userId === user.userId && transactions.accountNumber === accountNumber))
    );
  }

  getAllTransactions():Observable<Transaction[]>{
    return this.http.get<Transaction[]>('assets/movements.json');
  }

  newTransaction(newTransaction:Transaction){
    let transaction=JSON.parse(localStorage.getItem(`movements${newTransaction.accountNumber}`));
    if(transaction.length>0){
      transaction.forEach(element => {
        if(element.accountNumber===Number(newTransaction.accountNumber)) return false;
      });
      transaction.push(newTransaction);
      localStorage.setItem(`movements${newTransaction.accountNumber}`,JSON.stringify(transaction));
      return true;
    }
    return false
  }
}
