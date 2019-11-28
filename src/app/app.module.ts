import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule } from '@angular/common/http';

import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WritePostComponent } from './pages/write-post/write-post.component';
import { MainContentComponent } from './pages/main-content/main-content.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import {MatSpinner, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PostsComponent } from './pages/posts/posts.component';
// import { NgProgressModule } from 'ngx-progressbar';

import 'hammerjs';
import { ProfileComponent } from './pages/profile/profile.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { DraftsComponent } from './pages/drafts/drafts.component';
import { PublishedComponent } from './pages/published/published.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    LandingPageComponent,
    AppNavComponent,
    DashboardComponent,
    WritePostComponent,
    MainContentComponent,
    DashboardHomeComponent,
    PostsComponent,
    ProfileComponent,
    ArticlesComponent,
    DraftsComponent,
    PublishedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    EditorModule,
    // NgProgressModule,
    AngularFontAwesomeModule,
MatProgressSpinnerModule,MatProgressBarModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
