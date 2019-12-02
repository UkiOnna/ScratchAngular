import { Component, OnInit, Input } from '@angular/core';
import { SubdivisionDto } from 'src/app/models/Dtos/subdivision.model';
import { DepartmentDto } from 'src/app/models/Dtos/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  @Input() subdivision: SubdivisionDto;

  displayedColumns: string[] = ['id', 'name'];
  departments = new MatTableDataSource([]);
  searchValue = '';

  constructor(private departmentsService: DepartmentsService) { }

  ngOnInit() {
    this.departmentsService.getSubdivisionDepartments(this.subdivision.id).subscribe(result => {
      this.departments.data = result;
    });
  }

  applyFilter(filterValue: string) {
    this.departments.filter = filterValue.trim().toLowerCase();
  }
}
