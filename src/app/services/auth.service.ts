import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName='user1';
  password=1234;
  userId=1;

  constructor(private router:Router) { }

  public login(userName:string,password:number){
    if(userName===this.userName && password===this.password){
      localStorage.setItem('user',JSON.stringify({"userName":this.userName,"userId":this.userId}));
      return true;
    }
    return false;
  }

  public getCurrentUser():User{
    const user = localStorage.getItem('user');
    if(user){
     return JSON.parse(user);
    }
  }

  public isAuthenticated():boolean{
    const user = localStorage.getItem('user');
    if(user!==null){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
