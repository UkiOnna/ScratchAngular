import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PersonalStatisticComponent } from './components/personal-statistic/personal-statistic.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DialogAddUser } from './components/dialogs/dialog-add-user/dialog-add-user.component';
import { DialogAddTaskComponent } from './components/dialogs/dialog-add-task/dialog-add-task.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { DialogAddProjectComponent } from './components/dialogs/dialog-add-project/dialog-add-project.component';
import { DialogAddDepartamentComponent } from './components/dialogs/dialog-add-departament/dialog-add-departament.component';
import { DialogAddSubdivisionComponent } from './components/dialogs/dialog-add-subdivision/dialog-add-subdivision.component';
import { SubdivisionsComponent } from './components/subdivisions/subdivisions.component';
import { DialogIntervalComponent } from './components/dialogs/dialog-interval/dialog-interval.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MainPageComponent,
    PersonalStatisticComponent,
    NavbarComponent,
    FooterComponent,
    DialogAddUser,
    DialogAddTaskComponent,
    ProjectsComponent,
    DepartmentsComponent,
    TasksComponent,
    DialogAddProjectComponent,
    DialogAddDepartamentComponent,
    DialogAddSubdivisionComponent,
    SubdivisionsComponent,
    DialogIntervalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    HttpClient,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
