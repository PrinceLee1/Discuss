import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
public name;country;state;address;phone;website;company:any;
  acctinput: { 'name': any; 'country': any; 'state': any; 'address': any; 'phone': any; 'website': any; 'company': any; 'user': any;'key': string; };
  cookieValue: string;
  acctInfo: { 'acctinfo': string; 'key': string; };
  value: any;


  constructor(
    private apicall : ApicallsService,
  private cookies : CookieService,
  private toaster:ToastrService,
  private routes : Router,
  private activedRoute:ActivatedRoute
  ) { }

  accountInfo(){
    this.cookieValue = this.cookies.get('blog');
this.acctinput = {
  'name':this.name,'country':this.country,'state':this.state,'address':this.address,'phone':this.phone,'website':this.website,'company':this.company,'user':this.cookieValue,'key':'account'};
    
  this.apicall.postData(this.acctinput).subscribe(
    res =>{
      if(res['code'] == '01'){
       this.toaster.error(res['info'],'Security Center');
      }else if(res['code'] == '00'){
        this.toaster.success(res['info'],'Security Center');
        this.routes.navigateByUrl('/',{skipLocationChange:true}).then(()=>
        this.routes.navigate(['/dashboard/profile'])
        
        );
      }
      
    });
}
  ngOnInit() {
    this.cookieValue = this.cookies.get('blog');
    console.log(this.cookieValue)
this.acctInfo = {'acctinfo':this.cookieValue,'key':'19'}
    this.apicall.postData(this.acctInfo).subscribe(
      mes =>{
        if(mes['code'] == '01'){
         this.toaster.error(mes['info'],'Security Center');
        }else if(mes['code'] == '00'){
          this.value = mes['info'];
        }
        
      });
  }


}
