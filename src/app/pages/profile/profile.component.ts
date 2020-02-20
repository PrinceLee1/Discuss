import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApicallsService } from 'src/app/services/apicall.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
public name;country;state;address;phone;facebook;twitter;gmail:any;
  acctinput: { 'name': any; 'country': any; 'state': any; 'address': any; 'phone': any; 'facebook': any; 'twitter': any;'gmail':any; 'user': any;'key': string; };
  cookieValue: string;
  acctInfo: { 'acctinfo': string; 'key': string; };
  value: any;
  fileToUpload: File;
  imageUrl: any;
  formData: FormData;
  userImage: string | Blob;
  prog;photo = false;
prof = true;

  constructor(
    private apicall : ApicallsService,
  private cookies : CookieService,
  private toaster:ToastrService,
  private routes : Router,
  private activedRoute:ActivatedRoute
  ) { }

  accountInfo(){
    this.apicall.checkConnectionStatus();
    this.cookieValue = this.cookies.get('blog');
this.acctinput = {
  'name':this.name,'country':this.country,'state':this.state,'address':this.address,'phone':this.phone,'facebook':this.facebook,'twitter':this.twitter,'gmail': this.gmail,'user':this.cookieValue,'key':'account'};
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


uploadPic(file:FileList){  
  this.apicall.checkConnectionStatus();
  this.fileToUpload = file.item(0);
  var imgReader = new FileReader();
  imgReader.onload =(event:any) =>{
    this.imageUrl = event.target.result;
  }
  imgReader.readAsDataURL(this.fileToUpload);
  this.photo = false
  }
  addImage(){
    this.apicall.checkConnectionStatus();
     this.photo = true;
    this.cookieValue = this.cookies.get('blog');
    this.prog = true;
  this.formData = new FormData();
  this.formData.append("image",this.fileToUpload,this.fileToUpload.name),
  this.formData.append("key","acctpic");
  this.formData.append('id',this.cookieValue);
  this.apicall.sendData(this.formData).subscribe(
    (res)=>{ this.prog = false;this.toaster.success('Profile image uploaded successfully','Security Center');
    this.routes.navigateByUrl('/',{skipLocationChange:true}).then(()=>
    this.routes.navigate(['/dashboard/profile']))}
    )
  
  }

  ngOnInit() {
    this.cookieValue = this.cookies.get('blog');
this.acctInfo = {'acctinfo':this.cookieValue,'key':'19'}
    this.apicall.postData(this.acctInfo).subscribe(
      mes =>{
        if(mes['code'] == '01'){
         this.toaster.error(mes['info'],'Security Center');
        }else if(mes['code'] == '00'){
          this.value = mes['info'];
        }else if(this.value == null){
          this.prof = false;
        }else if(this.value){
          this.prof = true
        }
        
      });
  }


}
