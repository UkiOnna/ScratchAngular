import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CookieService } from 'ngx-cookie-service';
import { PersonalStatisticComponent } from './components/personal-statistic/personal-statistic.component';
import { DialogAddUser } from './components/dialogs/dialog-add-user/dialog-add-user.component';
import { DialogAddTaskComponent } from './components/dialogs/dialog-add-task/dialog-add-task.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DepartmentsComponent } from './components/departments/departments.component';


const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'main-page', component: MainPageComponent},
  { path: 'personal-statistic', component: PersonalStatisticComponent},
  { path:'projects',component:ProjectsComponent},
  { path:'departments',component:DepartmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CookieService],
  entryComponents:[DialogAddUser,DialogAddTaskComponent]
})
export class AppRoutingModule { }
