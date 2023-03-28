import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/Models/Booking';
import { Client } from 'src/Models/Client';
import { AuthService } from 'src/Service/auth.service';
import { BookServiceService } from 'src/Service/book-service.service';
import { BookingService } from 'src/Service/booking.service';
import { ClientService } from 'src/Service/client.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cl:Client={"cPassword":"","caddress":"","cname":"","noofBooks":0,"password":"","totalPrice":0,"userid":"","cid":0}
  cart:Booking[]=[{"author":"","bid":"","bkid":0,"bname":"","cid":0,"jonour":"","noofCopies":0,"price":0,"status":0,"totalPrice":0}];
  Unpaid_Orders:Booking[]=[];
  payment:number=0;
  error:string="";
  Bookexceedflag:boolean=false;
  // 
  
  constructor(private obj:BookingService,private bookobj:BookServiceService,private ClientObj:ClientService,private a1:AuthService,private route:Router)
  {
    this.cl=a1.cl;
  }
  ngOnInit(){
        //this.displayCartBook();
    this.obj.Unpaid_Orders(this.cl).subscribe(data=>{
      this.cart = data;  
      console.log(data.length);
      console.log(this.cart+"Cart is not empty");    
    }); 
  }
  displayCartBook(){
    this.obj.Unpaid_Orders(this.cl).subscribe(data=>{
      this.cart = data;  
      console.log(data.length);
      console.log(this.cart+"Cart is not empty");    
    }); 
  }

  onSubmit(){
    this.obj.Unpaid_Orders(this.cl).subscribe(data=>{
      this.Unpaid_Orders=data;
      if(this.Unpaid_Orders.length != 0){
        this.Unpaid_Orders.forEach(element => {
          this.payment += element.totalPrice;
          this.bookobj.getBookbyId(element.bid).subscribe(data1=>{
            if(data1.noofCopies >= element.noofCopies){
              data1.noofCopies -= element.noofCopies;
              this.bookobj.updateBook(data1.bid,data1).subscribe(UpdateBook=>{
                console.log("Books updated");
                console.log(UpdateBook);
              });
              element.status = 1;
              this.obj.updateBooking(element.bkid,element).subscribe(UpBooking=>{
                console.log("Booking updated to paid");
                console.log(UpBooking);
              });
              this.cl.totalPrice -= element.totalPrice;
              this.ClientObj.updateClient(this.cl.cid,this.cl).subscribe(UpClient=>{
                console.log("Client Details updated");
                console.log(UpClient);
              });
              this.error=this.payment+" Payment Successful";
              this.route.navigate(['/History']);
            }else{
              this.error= data1.bname + " Only "+data1.noofCopies+" copies available";
              this.Bookexceedflag = true;       
              //this.route.navigate(['/Cart']);       
            }
          }) 
        });
      }else{
        this.error="Payment not completed";
        this.route.navigate(['/Cart']);
      }
      if(this.Bookexceedflag){
        this.route.navigate(['/Cart']);
      }
      //location.reload();
    });
  }
  
  
}
