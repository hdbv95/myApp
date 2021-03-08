import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../interfaces/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.scss'],
})
export class AccountTransactionsComponent implements OnInit {
  accountNumber: number;
  accountTransactions:Transaction[];

  constructor(private router: ActivatedRoute,private transactionService:TransactionService) { }

  ngOnInit() {
    this.accountNumber = Number(this.router.snapshot.paramMap.get('accountNumber'));
    if(localStorage.getItem(`movements${this.accountNumber}`)===null){
      this.transactionService.getAllTrasnsactionsByAccountId(this.accountNumber).subscribe(response=>{
        this.accountTransactions=response
        localStorage.setItem(`movements${this.accountNumber}`,JSON.stringify (response));
      });
    }
    this.accountTransactions = JSON.parse(localStorage.getItem(`movements${this.accountNumber}`));
  }

}
