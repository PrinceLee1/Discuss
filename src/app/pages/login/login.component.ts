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
  value: any;
  cookieValue: string;
  acctInfo: { 'acctinfo': string; 'key': string; };
  constructor(private apicall :ApicallsService, 
    private routes:Router,
    private toaster :ToastrService,
    private cookies : CookieService) { }
  onSubmit(){

this.formInputs = {'email' : this.email,'password' : this.password,'key': '2'};
this.apicall.postData(this.formInputs).subscribe(
  val =>{
  if (val['code'] == "01"){
    this.toaster.error(val['info'],'Security Center')
  }else if(val['code'] == "00"){
    this.dat = Date.now()+(60*4000);
    this.cookies.set('blog',val['info'],1);
    this.cookies.set('blog1',JSON.stringify(this.dat),1);
    this.cookieValue = this.cookies.get('blog');
    this.acctInfo = {'acctinfo':this.cookieValue,'key':'19'}
        this.apicall.postData(this.acctInfo).subscribe(
          mes =>{
            if(mes['code'] == '01'){
             this.toaster.error(mes['info'],'Security Center');
            }else if(mes['code'] == '00'){
              this.value = mes['info'];
              this.routes.navigate(['/dashboard']);
              this.toaster.success('Welcome, please hold while your dashboard loads!.','Security Center');
            }else if(this.value == null){
              this.routes.navigate(['/dashboard/profile']);
              this.toaster.error('Please Update your Profile!.','Security Center');

            }
          });
   
  }
 
  
});
  }
  ngOnInit() {
    
   
  }

}
