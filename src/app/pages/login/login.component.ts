import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
// import { HostListener } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @HostListener('window:unload', ['$event'])
  //   unloadHandler(event) {
  //       window.sessionStorage.clear();
  //   }
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
    this.toaster.success('Welcome, hold on while we load your dashboard.','Security Center');
    this.dat = Date.now()+(60*4000);
    this.cookies.set('blog',val['info'],1);
    this.cookies.set('blog1',JSON.stringify(this.dat),1)

    this.routes.navigate(['/dashboard']);
  }
 
  
});
  }
  ngOnInit() {
   
  }

}
