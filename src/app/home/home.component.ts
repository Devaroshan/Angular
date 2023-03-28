import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Client } from 'src/Models/Client';
import { AuthService } from 'src/Service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  login_flag:boolean=false;
  home_flag:boolean=true;
  cl:Client={"cPassword":"","caddress":"","cname":"","noofBooks":0,"password":"","totalPrice":0,"userid":"","cid":0}
  navigationSubscription;
  constructor(private a1:AuthService,private route:Router){
    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.login_flag=this.a1.isLoggedIn();
    this.cl = this.a1.cl;
    this.home_flag=false;
  }
  ngOnInit(){
    this.home_flag=true;
    this.login_flag=this.a1.isLoggedIn();
  }
  onlogSubmit(){
    this.login_flag=this.a1.isLoggedIn();
    this.route.navigate(['/login']);
  }
  onSubmit(){
    this.a1.logout(); 
    this.route.navigate(['/login']);
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
