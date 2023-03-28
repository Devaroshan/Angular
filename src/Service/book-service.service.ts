import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Book } from '../Models/Book';
import { Observable, throwError } from 'rxjs';
//Importing both pipeable operator.
import {catchError} from 'rxjs/operators'
import { Fav } from 'src/Models/Fav';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http:HttpClient) { }
  
  //Variable to store the request URL for accessing API.
  req:string="https://localhost:7230/api/Books";

  
  //Method to get the list of all players from the API.
  getAllBooks():Observable<Book[]>
  {
    console.log("book came");
    return this.http.get<Book[]>(this.req);
  }
  getBookbyId(id:string):Observable<Book>
  {
    console.log("book came");
    return this.http.get<Book>(this.req+"/"+id,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
  createBook(book:Book):Observable<Book>
  {
    return this.http.post<Book>(this.req,book,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }

  favBook(f:Fav):Observable<Book[]>
  {
    return this.http.post<Book[]>(this.req+"/Fav",f,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }

  //Method to update an existing player.
  updateBook(id:string,book:Book):Observable<any>
  {
    
    return this.http.put<any>(this.req+"/"+id,book,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }


  //Method to delete an existing player.
  deleteBook(id:number):Observable<any>
  {
    return this.http.delete<any>(this.req+"/"+id,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

}
