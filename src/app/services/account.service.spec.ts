import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Account } from "../interfaces/account";
import { AccountService } from './account.service';
describe('AccountService', () => {
  let service: AccountService;
  let filledStore = [
    {
      "userId": 123456789012,
      "bankEntity": "bank1",
      "accountNumber": 1,
      "type": "ahorros",
      "name": "ah1",
      "balance": 1000.5,
      "currency": "USD"
    },
    {
      "userId": 123456789012,
      "bankEntity": "bank1",
      "accountNumber": 2,
      "type": "corriente",
      "name": "co1",
      "balance": 300.9,
      "currency": "USD"
    },
    {
      "userId": 123456478901,
      "bankEntity": "da",
      "accountNumber": 12345678901,
      "type": "ahorros",
      "name": "da",
      "balance": 0,
      "currency": "USD"
    }];
    let store ={};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return  JSON.stringify(filledStore);
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }};


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule 
      ]
    }).compileComponents();
    service = TestBed.inject(AccountService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test newAccount function',()=>{
    spyOn(localStorage,'getItem').and.callFake(mockLocalStorage.getItem);
    //el control de la cantidad de caracteres se realiza en la form de ingreso
    const newAccount:Account={
      userId:1,
      bankEntity:'bank1',
      accountNumber:2,
      type:'ahorros',
      name:'ah2',
      balance:0,
      currency:'USD',
    }
    expect(service.newAccount(newAccount)).toBe(true);
  })

  it('test newAccount when user have no accounts',()=>{
    spyOn(localStorage,'getItem').and.returnValues(JSON.stringify(store));
    //el control de la cantidad de caracteres se realiza en la form de ingreso
    const newAccount:Account={
      userId:1,
      bankEntity:'bank1',
      accountNumber:2,
      type:'ahorros',
      name:'ah2',
      balance:0,
      currency:'USD',
    }
    expect(service.newAccount(newAccount)).toBe(false);
  })

  it('test updateAccount for unexisting account',()=>{
    expect(service.updateAccountName(100,"newName")).toBe(false);
  });

});
