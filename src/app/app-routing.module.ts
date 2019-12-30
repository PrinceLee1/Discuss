import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { WritePostComponent} from './pages/write-post/write-post.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component'
import { from } from 'rxjs';
import {TitleCategoryResolverService} from './services/title-category-resolver.service';
import { AppNavComponent } from './app-nav/app-nav.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { MainContentComponent } from './pages/main-content/main-content.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { DraftsComponent } from './pages/drafts/drafts.component';
import { PublishedComponent } from './pages/published/published.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
//   {path : '',
//   redirectTo :'home',
//   pathMatch :'full'
// },
  {path : '', component:AppNavComponent,children:[
    {path : '',component:LandingPageComponent},
    {path : 'signup', component:SignupComponent},
    {path : 'forgot-password', component:ForgotPasswordComponent},
    {path :'reset-password/:id', component:ResetPasswordComponent},
  {path : 'login', component:LoginComponent},
  {path : 'articles', component:ArticlesComponent},
  {path : 'main-content/:title/:id',component:MainContentComponent},
  ]},
  {path : 'dashboard', component:DashboardComponent,children:[
    {path : '', component:DashboardHomeComponent},
    {path : 'write-post/:id', component:WritePostComponent},
    {path : 'posts', component:PostsComponent},
    {path :'profile',component:ProfileComponent},
    {path : 'drafts',component:DraftsComponent},
    {path : 'published',component:PublishedComponent}
  ]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 