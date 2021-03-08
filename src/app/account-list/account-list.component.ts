import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../interfaces/account'
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  accounts:Account[];

  constructor(private accountService:AccountService, private router:Router,private transactionService:TransactionService) {

  }

  ngOnInit() {
    this.transactionService.getAllTransactions().subscribe(response=>{
      localStorage.setItem('movements',JSON.stringify(response));
      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        if(localStorage.getItem(`movements${element.accountNumber}`)===null){
          this.transactionService.getAllTrasnsactionsByAccountId(element.accountNumber).subscribe(response=>{
            localStorage.setItem(`movements${element.accountNumber}`,JSON.stringify (response));
          });
        }
      }
    });

    if(localStorage.getItem('accounts')===null){
      this.accountService.getAllAccounts().subscribe( (response) => {
        this.accounts = response;
        localStorage.setItem('accounts',JSON.stringify (response));
      });
    }
    this.accounts=JSON.parse(localStorage.getItem('accounts'));

  }
  
  getDetails(accountNumber:number){
    this.router.navigate(['home/tabs/tab1/transaction', accountNumber]);
  }
  doRefresh(event){
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 500);    
  }
}
