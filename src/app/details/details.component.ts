import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/Models/Book';
import { Booking } from 'src/Models/Booking';
import { Client } from 'src/Models/Client';
import { AuthService } from 'src/Service/auth.service';
import { BookServiceService } from 'src/Service/book-service.service';
import { BookingService } from 'src/Service/booking.service';
import { ClientService } from 'src/Service/client.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  cl:Client={"cPassword":"","caddress":"","cname":"","noofBooks":0,"password":"","totalPrice":0,"userid":"","cid":0}
  bk:Booking={"author":"","bid":"","bkid":0,"bname":"","cid":0,"jonour":"","noofCopies":0,"price":0,"status":0,"totalPrice":0}
  bid:string="";
  bk1:Booking;
  er:string="";
  //={"author":"","bid":"","bkid":0,"bname":"","cid":0,"jonour":"","noofCopies":0,"price":0,"status":0,"totalPrice":0}
  NewBooking:Booking={"author":"","bid":"","bkid":0,"bname":"","cid":0,"jonour":"","noofCopies":0,"price":0,"status":0,"totalPrice":0}
  NoofBooksOrdered:number=0;
  Book_Details:Book={"bid":"","bname":"","jonour":"","noofCopies":0,"author":"","price":0};
  error:string="";
  cl_put:Client;
  bf:boolean=false;
  ref:number=0;
  constructor(private obj:BookServiceService,private obj1:BookingService,private Client_Obj:ClientService,private a1:AuthService,private route:Router,private _Activatedroute:ActivatedRoute){
    this.cl = a1.cl;
  }
  ngOnInit(){
    this.displayBook();
  }
  displayBook(){
    this._Activatedroute.params.subscribe(params=> {
        this.bid = params['id'];
        this.get_book(this.bid);
        console.log(params);
        console.log(this.bid);
    })
  }
  get_book(id:string):void
  {
    this.obj.getBookbyId(id).subscribe(data=>{
      this.Book_Details=data;
      //this.b_f = true;
      //this.flag_get=true;this.flag_post=false;this.flag_put=false;this.flag_delete=false;this.flag_register=false;
      //Logging the response recieved from web api.
      console.log(this.Book_Details);
    });
  }

  
  onSubmit(){
    //{debugger}
    if(this.Book_Details != null){
      console.log(this.NoofBooksOrdered);
      console.log(this.Book_Details.noofCopies);
      if(this.NoofBooksOrdered > this.Book_Details.noofCopies){
        console.log("navigate");
        this.error="Only " + this.Book_Details.noofCopies + " copies available";
        this.route.navigate(['/Details',this.bid]);
        // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        // this._Activatedroute.params.subscribe(params=> {
        //   this.bid = params['id'];
        //   this.get_book(this.bid);
        //   console.log(params);
        //   console.log(this.bid);
        // });
      }else{
        if(this.a1.cl != null){
          console.log(this.a1.cl);
          this.bk.bid = this.Book_Details.bid;
          this.bk.cid = this.a1.cl.cid;
          //this.ClientOrders(); 
          this.obj1.Client_Orders(this.bk).subscribe(data=>{
            this.bk1 = data; 
            console.log(this.bk1);     
            if(this.bk1 != null){
              console.log("Already selected book");
              this.ref=this.bk1.noofCopies;
              this.bk1.noofCopies += this.NoofBooksOrdered;
              this.bk1.totalPrice += (this.NoofBooksOrdered * this.Book_Details.price);
              if (this.Book_Details.noofCopies < this.bk1.noofCopies){
                this.error="Already "+this.ref+" added to cart. Only " + (this.Book_Details.noofCopies-this.ref) + " copies available";
                this.route.navigate(['/Details',this.Book_Details.bid]);
              }else{
                this.bk1.status = 0;
                console.log(this.bk1);
                this.obj1.updateBooking(this.bk1.bkid,this.bk1).subscribe(data=>{
                  this.bk1 = data;
                  console.log("Booking added to existing booking");
                  this.ClientUpdate();
                });
              }
              
            }
          },error=>{
              if(error!=null){
                this.NewBooking.bid = this.bid;
                this.NewBooking.bname = this.Book_Details.bname;
                this.NewBooking.author = this.Book_Details.author;
                this.NewBooking.jonour = this.Book_Details.jonour;
                this.NewBooking.noofCopies = this.NoofBooksOrdered;
                this.NewBooking.totalPrice = (this.NoofBooksOrdered * this.Book_Details.price);
                this.NewBooking.price = this.Book_Details.price;
                this.NewBooking.cid = this.a1.cl.cid;
                this.NewBooking.status = 0; 
                this.obj1.createBooking(this.NewBooking).subscribe(data=>{
                  this.bk1 = data;
                  console.log("New Booking created");
                  this.ClientUpdate();
                });                            
              }
          });
        }
      }
      
    }
  }
  ClientUpdate(){
    if(this.a1.cl.noofBooks != null){
      this.a1.cl.noofBooks += this.NoofBooksOrdered;
      this.a1.cl.totalPrice += (this.NoofBooksOrdered*this.Book_Details.price);
    }else{
      this.a1.cl.noofBooks = this.NoofBooksOrdered;
      this.a1.cl.totalPrice = (this.NoofBooksOrdered * this.Book_Details.price);
    }
    this.Client_Obj.updateClient(this.a1.cl.cid,this.a1.cl).subscribe(data=>{
      this.cl_put = data;
      console.log(this.cl_put);
      console.log("Client details updated");
      this.error = "Book added to Cart";
      this.route.navigate(['/books']);
    });    
  }
}
