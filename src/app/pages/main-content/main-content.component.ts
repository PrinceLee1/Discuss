import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { ApicallsService } from 'src/app/services/apicall.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  blogId: string;
  value =[];
  getData: any;

  constructor(private activedRoute:ActivatedRoute,private apicall:ApicallsService,private toaster :ToastrService) { }

  ngOnInit() {
    this.blogId = this.activedRoute.snapshot.paramMap.get('id');console.log(this.blogId);
    this.getData = {'blogId':this.blogId,'key':'6'};
    this.apicall.postData(this.getData).subscribe(
      val =>{
        if(val['code']== "00"){
          this.value = val['info'];
          console.log(this.value)
        }else if(val['code']== "01"){
          this.toaster.error(val['info'],'Security Center');
        }
      });
  }

}
