import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PersonalStatisticComponent } from './components/personal-statistic/personal-statistic.component';
import { DepartmentStatisticComponent } from './components/department-statistic/department-statistic.component';
import { DivisionStatisticComponent } from './components/division-statistic/division-statistic.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DialogAddUser } from './components/dialogs/dialog-add-user/dialog-add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MainPageComponent,
    PersonalStatisticComponent,
    DepartmentStatisticComponent,
    DivisionStatisticComponent,
    NavbarComponent,
    FooterComponent,
    DialogAddUser,
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
