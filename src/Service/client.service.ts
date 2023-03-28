import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/Models/Client';
import { login } from 'src/Models/login';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }
  
  //Variable to store the request URL for accessing API.
  req:string="https://localhost:7230/api/Clients";

  
  // //Method to get the list of all players from the API.
  // getAllUsers():Observable<Client[]>
  // {
  //   console.log("book came");
  //   return this.http.get<Book[]>(this.req);
  // }
  getClientbyId(id:string):Observable<Client>
  {
    console.log("book came");
    return this.http.get<Client>(this.req+"/"+id,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  auth(log:login):Observable<Client>
  {
    return this.http.post<Client>(this.req+"/Auth",log,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }

  createClient(client:Client):Observable<Client>
  {
    return this.http.post<Client>(this.req,client,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }

  //Method to update an existing player.
  updateClient(id:number,client:Client):Observable<any>
  {
    
    return this.http.put<any>(this.req+"/"+id,client,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }


  // //Method to delete an existing player.
  // deleteUser(id:number):Observable<any>
  // {
  //   return this.http.delete<any>(this.req+"/"+id,{
  //     headers:new HttpHeaders({
  //       'Content-Type':'application/json;charset=UTF-8',
  //       'Access-Control-Allow-Origin':'*',
  //       'Access-Control-Allow-Method':'*'
  //     })
  //   });
  // }
}
