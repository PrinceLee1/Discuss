import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { ApicallsService } from 'src/app/services/apicall.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  blogId: string;
  value=[]; 
  getData;vale;data :any;
  cookieValue: string;

  constructor(private activedRoute:ActivatedRoute,
    private apicall:ApicallsService,
    private cookies : CookieService,
    private toaster :ToastrService) { }

  ngOnInit() {
   
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
       console.log(this.cookieValue)
      this.data = {'cookies':this.blogId,'key':'check'};
      this.apicall.postData(this.data).subscribe(
        val =>{
          if(val['code']== "00"){
            this.vale = val['info'];
            console.log(this.vale)
          }else if(val['code']== "01"){
            this.toaster.error(val['info'],'Security Center')
          }
           
        });
  }

}
