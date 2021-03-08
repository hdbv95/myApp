import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm:FormGroup;
  
  constructor( private formBuilder: FormBuilder, public router:Router,private authService:AuthService) {    
  }

  ngOnInit() {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required],
    });
  }

  onSubmit(){
    if(this.authService.login(this.loginForm.value.userName,Number(this.loginForm.value.password))){
      this.router.navigate(['home/tabs/tab1']);
    }
  }

}
