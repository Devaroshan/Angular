import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/Models/Book';
import { Client } from 'src/Models/Client';
import { AuthService } from 'src/Service/auth.service';
import { BookServiceService } from 'src/Service/book-service.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  Books:Book[]=[];
  b_f:Boolean;
  login_flag:boolean=false;
  cl:Client={"cPassword":"","caddress":"","cname":"","noofBooks":0,"password":"","totalPrice":0,"userid":"","cid":0}
  
  
  constructor(private obj:BookServiceService,private a1:AuthService,private route:Router)
  {
    //this.get_api();
    this.b_f = false;
    this.cl=a1.cl;
  }
  ngOnInit(){
    this.login_flag=this.a1.isLoggedIn();
    this.Books = this.a1.book;
    this.b_f = true;
  }
  get_api():void
  {
    this.obj.getAllBooks().subscribe(data=>{
      this.Books=data;
      this.b_f = true;
      //this.flag_get=true;this.flag_post=false;this.flag_put=false;this.flag_delete=false;this.flag_register=false;
      //Logging the response recieved from web api.
      console.log(this.Books);
    });
  }
  onSubmit(){
    this.a1.logout();   
    this.route.navigate(['/login']);
  }
  getColourJonour(jonour:string){
    switch(jonour){
      case 'Fiction': return 'url("https://img.lovepik.com//photo/50055/8843.jpg_860.jpg")'
      case 'Fun': return 'url("https://e0.pxfuel.com/wallpapers/39/196/desktop-wallpaper-dog-book-funny-art-vector-widescreen-16-10-background.jpg")'
      case 'Science': return 'url("https://i.pinimg.com/736x/aa/75/0f/aa750fe575aa886d0ed9f5fc96ae5c68.jpg")'
      case 'Horror' : return 'url("https://media.istockphoto.com/id/1270033193/photo/the-wizards-room-with-library-old-books-pumpkins-potion-and-scary-things-3d-render.jpg?s=612x612&w=0&k=20&c=8_rr1kUIApm6wBnN4sAxGmV5aMzP7QnYUYeT0bPD0HU=")'
      case 'Economics' : return 'url("https://portal.fgv.br/sites/portal.fgv.br/files/styles/noticia_geral/public/noticias/09/22/livro-direito-e-economia.jpg?itok=deI4UQ9a")'
      case 'Biography' : return 'url("https://w0.peakpx.com/wallpaper/860/693/HD-wallpaper-imagination-book-fantasy-abstract.jpg")'
      case 'Politics' : return 'url("https://img.freepik.com/premium-photo/political-news-education-concept-red-typewriter-flags-spain-france-great-britain-other-countries-backpack-books-stationery-background-blackboard_656538-603.jpg")'
      default : return 'url("http://oyster.ignimgs.com/wordpress/stg.ign.com/2012/10/americanhorrorstory_101612_header-1.jpg")'
    }
  }

}
