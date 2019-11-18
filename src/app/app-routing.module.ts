import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CookieService } from 'ngx-cookie-service';


const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'main-page', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
