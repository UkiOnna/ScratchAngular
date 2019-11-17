import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/user.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  user: UserDto;
  taskDate = new FormControl(new Date());
  searchValue = 'Clear me';

  constructor() { }

  ngOnInit() {
  }

}
