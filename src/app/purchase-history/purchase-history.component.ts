import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/Models/Booking';
import { Client } from 'src/Models/Client';
import { AuthService } from 'src/Service/auth.service';
import { BookingService } from 'src/Service/booking.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit{
  
  cl:Client={"cPassword":"","caddress":"","cname":"","noofBooks":0,"password":"","totalPrice":0,"userid":"","cid":0}
  cart:Booking[]=[];
  // {"Author":"","Bid":"","Bkid":0,"Bname":"","Cid":0,"Jonour":"","NoofCopies":0,"Price":0,"Status":0,"TotalPrice":0}
  
  constructor(private obj:BookingService,private a1:AuthService,private route:Router)
  {
    this.cl=a1.cl;
    //this.displayHistoryBook();
  }
  ngOnInit(){
    this.displayHistoryBook();
    
  }
  displayHistoryBook(){
    this.obj.Paid_Orders(this.cl).subscribe(data=>{
      this.cart = data;  
      console.log(this.cart);    
    }); 
  }
}
