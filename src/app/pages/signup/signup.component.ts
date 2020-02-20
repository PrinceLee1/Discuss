import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public name;surname;email;password;dat: any;
  public formInputs : any;
constructor(private apicall : ApicallsService,private routes : Router,private toaster:ToastrService,private cookies : CookieService) { }
    onSubmit(){
  this.formInputs = {'name' : this.name, 'surname' : this.surname,
  'email' : this.email,'password' : this.password,'key': '1'};
 
  this.apicall.postData(this.formInputs).subscribe(
    (val) =>{
      if(val['code'] == '01'){
       this.toaster.error(val['info'],'Security Center');
      }else if(val['code'] == '00'){
        this.dat = Date.now()+(60*4000);
        this.cookies.set('blog',val['info'],1);
        this.cookies.set('blog1',JSON.stringify(this.dat),1)
        this.toaster.success(val['info'],'Security Center');
        this.routes.navigate(['']);
      }
      
    });
  
 }
  ngOnInit() {
    this.apicall.checkConnectionStatus();
  }

}
