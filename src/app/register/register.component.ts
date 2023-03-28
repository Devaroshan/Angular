import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/Models/Client';
import { AuthService } from 'src/Service/auth.service';
import { ClientService } from 'src/Service/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  cl:Client={"cPassword":"","caddress":"","cname":"","noofBooks":0,"password":"","totalPrice":0,"userid":"","cid":0}
  error:string="";
  cl1:Client;
  constructor(private obj:ClientService,private route:Router,private _Activatedroute:ActivatedRoute,private a1:AuthService){
    
  }
  ngOnInit(){
    //
    
  }

  onSubmit(){
    this.obj.createClient(this.cl).subscribe(data=>{
      this.cl1 = data;  
      console.log(data+"Registered");    
    });   
    if(this.cl1 != null){
      this.a1.login(this.cl1);
      this.route.navigate(['/books']);
    }else{
      this.error="Email id already exists";
      this.route.navigate(['/register']);
    }
  }
}
