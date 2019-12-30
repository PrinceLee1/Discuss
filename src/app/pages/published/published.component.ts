import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.css']
})
export class PublishedComponent implements OnInit {
  cookieValue: string;
  getData: { 'draftscookie': string; 'key': string; };
  value: any;

  constructor(
    private apicall : ApicallsService,
  private cookies : CookieService,
  private toaster:ToastrService,
  private routes : Router,
  ) { }

  ngOnInit() {
    this.cookieValue = this.cookies.get('blog');
    this.getData = {'draftscookie':this.cookieValue,'key':'getDrafts'};
    this.apicall.postData(this.getData).subscribe(
      res=>{
        if(res['code']== "00"){
          this.value = res['msg'];
        }else if(res['code']== "01"){
          this.toaster.error(res['msg'],'Security Center');
        }
      });
  }

}
