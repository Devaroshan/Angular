import { Injectable } from '@angular/core';
import { Book } from 'src/Models/Book';
import { Client } from 'src/Models/Client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:boolean=false;
  cl:Client={"cPassword":"","caddress":"","cname":"","noofBooks":0,"password":"","totalPrice":0,"userid":"","cid":0}
  book:Book[]=[];
  constructor() { }

  //login method.
  login(cl1:Client):void
  {
    this.cl = cl1;
    this.loggedIn=true;
  }
  
  //logout method.
  logout():void
  {
      this.loggedIn=false;
  }

  //isLoggedIn method.
  isLoggedIn():boolean
  {
    return this.loggedIn;
  }

  Fav(b:Book[]){
    this.book = b;
  }
}
