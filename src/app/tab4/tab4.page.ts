import { Component } from '@angular/core';
import { Account } from '../interfaces/account';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  accounts:Account[];
  transferForm:FormGroup;
  success:boolean;
  submitted:boolean;

  constructor(private formBuilder: FormBuilder,private accountService:AccountService) {}

  ngOnInit(){
    this.transferForm = this.formBuilder.group({
      fromAccountNumber:['',Validators.required],
      toAccountNumber:['',Validators.required],
      amount:['',Validators.required]
    });
    this.accounts=JSON.parse(localStorage.getItem('accounts'));
  }

  onSubmit(){
    this.submitted=true;
    if(this.transferForm.valid) {
      this.success=this.accountService.transfer(this.transferForm.value.fromAccountNumber,this.transferForm.value.toAccountNumber,this.transferForm.value.amount); 
    }
    setTimeout(() => {
      this.submitted=false;
      this.ngOnInit();
    }, 500);
  }

}
