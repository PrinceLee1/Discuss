import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { ApicallsService } from 'src/app/services/apicall.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { style } from '@angular/animations';
import { tada } from 'ng-animate';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  blogId: string;
  value=[]; 
  getData;vale;data;welcome;writerImage;carryName :any;
  cookieValue: string;
  acctInfo: { 'acctinfo': string; 'key': string; };
  inputs: any;
  getdata: { 'key': string; };

  constructor(private activedRoute:ActivatedRoute,
    private apicall:ApicallsService,
    private cookies : CookieService,
    private toaster :ToastrService) { }

    
like(){
  alert(tada)
}

  ngOnInit() {
  //  this.carryName= {'get.author':this.writerImage}
  //  alert(this.carryName)
    this.blogId = this.activedRoute.snapshot.paramMap.get('id');
    this.getData = {'blogId':this.blogId,'key':'6'};
    this.apicall.postData(this.getData).subscribe(
      val =>{
        if(val['code']== "00"){
          this.value = val['info'];
        }else if(val['code']== "01"){
          this.toaster.error(val['info'],'Security Center');
        }
      });
       this.cookieValue = this.cookies.get('blog');
      this.data = {'cookies':this.blogId,'key':'check'};
      this.apicall.postData(this.data).subscribe(
        val =>{
          if(val['code']== "00"){
            this.vale = val['info'];
          }else if(val['code']== "01"){
            this.toaster.error(val['info'],'Security Center')
          }
           
        });
        this.cookieValue = this.cookies.get('blog');
        this.acctInfo = {'acctinfo':this.cookieValue,'key':'19'}
            this.apicall.postData(this.acctInfo).subscribe(
              mes =>{
                if(mes['code'] == '01'){
                 this.toaster.error(mes['info'],'Security Center');
                }else if(mes['code'] == '00'){
                  this.welcome = mes['info'];
                }
                
              });
              this.getdata = {'key':'5'};
              this.apicall.postData(this.getdata).subscribe(
                val =>{
                  if(val['code']== "00"){
                    this.inputs = val['info'];
                  }else if(val['code']== "01"){
                    this.toaster.error(val['info'],'Security Center')
                  }
                });
  }

}
