import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CookieService } from 'ngx-cookie-service';
import { DialogAddUser } from './components/navbar/navbar.component';
import { PersonalStatisticComponent } from './components/personal-statistic/personal-statistic.component';


const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'main-page', component: MainPageComponent},
  { path: 'personal-statistic', component: PersonalStatisticComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CookieService],
  entryComponents: [
      DialogAddUser
  ]
})
export class AppRoutingModule { }
