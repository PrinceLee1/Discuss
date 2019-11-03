import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public email;password;dat: any;
public formInputs : any;
  constructor(private apicall :ApicallsService, private routes:Router,private toaster :ToastrService,private cookies : CookieService) { }
  onSubmit(){
this.formInputs = {'email' : this.email,'password' : this.password,'key': '2'};
this.apicall.postData(this.formInputs).subscribe(
  val =>{

  if (val['code'] == "01"){
    this.toaster.error(val['info'],'Security Center')
  }else if(val['code'] == "00"){
    this.toaster.success('Welcome!','Security Center');
    this.dat = Date.now()+(60*4000);
   
  
    this.cookies.set('blog',val['info'],this.dat);
    this.routes.navigate(['/dashboard']);
  }
  if (Date.now()>this.dat){
    this.routes.navigate(['/login']);

  }
  
});
  }
  ngOnInit() {
  }

}
