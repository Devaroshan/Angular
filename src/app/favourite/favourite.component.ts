import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fav } from 'src/Models/Fav';
import { AuthService } from 'src/Service/auth.service';
import { BookServiceService } from 'src/Service/book-service.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit{
  f:Fav={"author":null,"jonour":null}
  author:string[]=[null];
  jonour:string[]=[null]
  
  
  constructor(private book:BookServiceService,private a:AuthService,private route:Router){
    
  }
  ngOnInit(): void {
    this.book.getAllBooks().subscribe(data=>{
      {debugger}
      let authorList = new Set<string>;
      let jonourList = new Set<string>;
      data.forEach(element => {
        authorList.add(element.author);
        jonourList.add(element.jonour);
      });
      this.author = Array.from(authorList);
      this.jonour = Array.from(jonourList);
    })
  }
  FavSubmit(){
    {debugger}
    this.book.favBook(this.f).subscribe(data=>{
      this.a.Fav(data);
      console.log(data);
      console.log(this.a.book);
      this.route.navigate(['/books']);
    })
  }
  selectchange1($event){
    this.f.author = this.author[$event];
  }
  selectchange2($event){
    this.f.jonour = this.jonour[$event];
  }
}
