import { Component } from '@angular/core';
import { Account } from '../interfaces/account';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  accounts:Account[];
  accountUpdateForm:FormGroup;
  success:boolean;
  submitted:boolean;

  constructor(private formBuilder: FormBuilder,private accountService:AccountService) {}

  ngOnInit(){
    this.accountUpdateForm = this.formBuilder.group({
      accountNumber:['',Validators.required],
      newName:['',Validators.required]
    });
    this.accounts=JSON.parse(localStorage.getItem('accounts'));
  }

  onSubmit(){
    this.submitted=true;
    if(this.accountUpdateForm.valid) {
      this.success = this.accountService.updateAccountName(Number(this.accountUpdateForm.value.accountNumber),this.accountUpdateForm.value.newName);
    }
    setTimeout(() => {
      this.submitted=false;
      this.ngOnInit();
    }, 500);
  }

}
