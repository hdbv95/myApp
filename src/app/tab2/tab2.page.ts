import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../interfaces/account'
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  newAccountForm:FormGroup;
  submitted:boolean;
  success:boolean;

  constructor(private formBuilder: FormBuilder,private accountService:AccountService) {
  }
  
  ngOnInit(){
    this.newAccountForm = this.formBuilder.group({
      userId:['',[Validators.required,Validators.pattern(/\d{12}/)]],
      bankEntity:['',Validators.required],
      accountName:['',Validators.required],
      accountNumber:['',[Validators.required,Validators.pattern(/\d{11}/)]],
      accountType:['',Validators.required],
      currency:['',Validators.required]
    });
  }

  onSubmit(){
    this.submitted=true;

    const newAccount:Account={
      userId:this.newAccountForm.value.userId,
      bankEntity:this.newAccountForm.value.bankEntity,
      accountNumber:this.newAccountForm.value.accountNumber,
      type:this.newAccountForm.value.accountType,
      name:this.newAccountForm.value.accountName,
      balance:0,
      currency:this.newAccountForm.value.currency,
    };
    if(this.newAccountForm.valid) this.success=this.accountService.newAccount(newAccount);
  }

}
