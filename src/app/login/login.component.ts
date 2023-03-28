import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/Models/Client';
import { login } from 'src/Models/login';
import { AuthService } from 'src/Service/auth.service';
import { ClientService } from 'src/Service/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  log:login={"userid":"","password":""};
  cl:Client;
  userid:string="";
  pwd:string="";
  error:string="";
  constructor(private obj:ClientService,private route:Router,private _Activatedroute:ActivatedRoute,private a1:AuthService){
    this.userid=" ";
    this.pwd=" ";
    // this.log.userid=" ";
    // this.log.password=" ";
  }
  ngOnInit(){
    //
    
  }

  onSubmit(){
    this.log.userid=this.userid;
    this.log.password=this.pwd;
    this.obj.auth(this.log).subscribe(data=>{
      this.cl = data;  
      console.log(this.cl);    
      console.log("Logged In");
      if(this.cl != null){
        this.a1.login(this.cl);
        console.log(this.a1.cl);
        this.route.navigate(['/Fav']);
      }else{
        this.error="Invalid Username or Password";
        console.log(this.log);
        this.route.navigate(['/login']);
      }
    });   
    
  }
}
