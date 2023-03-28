import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/Models/Booking';
import { Client } from 'src/Models/Client';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }
  
  //Variable to store the request URL for accessing API.
  req:string="https://localhost:7230/api/Bookings";

  
  //Method to get the list of all players from the API.
  getAllBookings():Observable<Booking[]>
  {
    console.log("book came");
    return this.http.get<Booking[]>(this.req);
  }
  getBookingbyId(id:number):Observable<Booking>
  {
    console.log("booking came");
    return this.http.get<Booking>(this.req+"/"+id,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
  createBooking(booking:Booking):Observable<Booking>
  {
    return this.http.post<Booking>(this.req,booking,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }

  //Method to update an existing player.
  updateBooking(id:number,booking:Booking):Observable<any>
  {
    
    return this.http.put<any>(this.req+"/"+id,booking,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }


  //Method to delete an existing player.
  deleteBooking(id:number):Observable<any>
  {
    return this.http.delete<any>(this.req+"/"+id,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  Client_Orders(bk:Booking):Observable<Booking>
  {
    return this.http.post<Booking>(this.req+"/Client_Orders",bk,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }

  Paid_Orders(cl:Client):Observable<Booking[]>
  {
    return this.http.post<Booking[]>(this.req+"/Paid_Orders",cl,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }

  Unpaid_Orders(cl:Client):Observable<Booking[]>
  {
    return this.http.post<Booking[]>(this.req+"/Unpaid_Orders",cl,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }
}
