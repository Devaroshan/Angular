import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/Models/Booking';
import { Client } from 'src/Models/Client';
import { AuthService } from 'src/Service/auth.service';
import { BookingService } from 'src/Service/booking.service';
import { ClientService } from 'src/Service/client.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cl:Client={"cPassword":"","caddress":"","cname":"","noofBooks":0,"password":"","totalPrice":0,"userid":"","cid":0}
  bk:Booking={"author":"","bid":"","bkid":0,"bname":"","cid":0,"jonour":"","noofCopies":0,"price":0,"status":0,"totalPrice":0}
  bkid:number=0;
  error:string="";
  constructor(private obj1:BookingService,private ClientObj:ClientService,private a1:AuthService,private route:Router,private _Activatedroute:ActivatedRoute){
    this.cl = a1.cl;
  }
  ngOnInit(){
    this.displayBooking();
  }
  displayBooking(){
    this._Activatedroute.params.subscribe(params=> {
        this.bkid = params['id'];
        this.get_booking(this.bkid);
        console.log(params);
        console.log(this.bkid);
    })
  }
  get_booking(id:number):void
  {
    this.obj1.getBookingbyId(id).subscribe(data=>{
      this.bk=data;
      //this.b_f = true;
      //this.flag_get=true;this.flag_post=false;this.flag_put=false;this.flag_delete=false;this.flag_register=false;
      //Logging the response recieved from web api.
      console.log(this.bk);
    });
  }

  onRemove(bookingid){
    this.obj1.getBookingbyId(bookingid).subscribe(TobeDeletedBookk=>{
      console.log("Booking retrived");
      this.a1.cl.noofBooks -= TobeDeletedBookk.noofCopies;
      this.a1.cl.totalPrice -= TobeDeletedBookk.totalPrice;
      this.ClientObj.updateClient(this.a1.cl.cid,this.a1.cl).subscribe(ClObj=>{
        console.log("Client updated");
        console.log(ClObj);
      });
    })
    this.obj1.deleteBooking(bookingid).subscribe(deleteBook=>{
      console.log("Booking deleted");
      console.log(deleteBook);
      this.route.navigate(['/Cart']);
    })
    
  }

}
