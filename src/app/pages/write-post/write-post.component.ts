import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { Router,ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
// import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent implements OnInit {
public article;title;category;publish_type;formInputs:any;
  getData: any;
  value: any;
  cookieValue: any;
  fileToUpload: File;
  imageUrl: string;
  formData: FormData;
  blog_id: any;
  blogId: any;
  fetch: any;
  cat: any;

  constructor(private apicall : ApicallsService,private routes : Router,private toaster:ToastrService,private cookies : CookieService,private activatedRoute : ActivatedRoute,private activedRoute:ActivatedRoute) { }
submitPost(x:NgForm){
  console.log(x.value.article);
  this.blog_id = this.activatedRoute.snapshot.paramMap.get('id');
  let blog ={
    title : this.fetch,
    category : x.value.category,
    article : x.value.article,
    publish_type:x.value.publish_type,
    author_id:this.cookieValue,
    blog_id:this.blog_id,
    key : '3'
  }
  
  this.apicall.postData(blog).subscribe(
    val =>{
      if(val['code'] == '01'){
       this.toaster.error(val['info'],'Security Center');
      }else if(val['code'] == '00'){
        this.toaster.success(val['info'],'Security Center');
        this.routes.navigate(['']);
      }
      
    });
}
uploadPic(file:FileList){
console.log(file)
this.fileToUpload = file.item(0);
var imgReader = new FileReader();
imgReader.onload =(event:any) =>{
  this.imageUrl = event.target.result;
}
imgReader.readAsDataURL(this.fileToUpload)
}
addImage(){
this.formData = new FormData();
this.formData.append("image",this.fileToUpload,this.fileToUpload.name),
this.formData.append("blog_id",this.blog_id),
this.formData.append("key","11");
this.formData.append('id',this.cookieValue);
console.log(this.formData);

this.apicall.sendData(this.formData).subscribe(
  (res)=>{console.log(res)},
  
)
}
  ngOnInit() {
    this.blog_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cookieValue = this.cookies.get('blog');
    this.getData = {'key':'5'};
    this.apicall.postData(this.getData).subscribe(
      val =>{
        if(val['code']== "00"){
          this.value = val['info'];
          console.log(this.value);
        }else if(val['code']== "01"){
          this.toaster.error(val['info'],'Security Center')
        }
      });
      this.blogId = this.activedRoute.snapshot.paramMap.get('id');
      this.getData = {'blogId':this.blogId,'key':'6'};
      this.apicall.postData(this.getData).subscribe(
        val =>{
          if(val['code']== "00"){
            this.fetch = val['info'][0].title
            this.cat = val['info'][0].category
            console.log(this.fetch)
          }else if(val['code']== "01"){
            this.toaster.error(val['info'],'Security Center');
          }
        });
  }

}
