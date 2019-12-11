import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SubdivisionDto } from 'src/app/models/Dtos/subdivision.model';
import { DepartmentDto } from 'src/app/models/Dtos/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SubdivisionsService } from 'src/app/services/subdivisions.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  id: number;
  subdivision: SubdivisionDto;

  displayedColumns: string[] = ['id', 'name'];
  departments = new MatTableDataSource([]);
  searchValue = '';

  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(private departmentsService: DepartmentsService,
    private route: ActivatedRoute,
    private subdivisionsService: SubdivisionsService,
    private router: Router) { }

  ngOnInit() {
    this.subdivisionsService.getSubdivison(this.route.snapshot.params.id).subscribe(s => {
      this.subdivision = s;

      this.departmentsService.getSubdivisionDepartments(this.subdivision.id).subscribe(d => {
        this.departments.data = d;
      });
    });

    setTimeout(() => this.departments.paginator = this.paginator);
  }

  applyFilter(filterValue: string) {
    this.departments.filter = filterValue.trim().toLowerCase();
  }

  open(id: number) {
    this.router.navigate(['/projects/' + id.toString()]);
  }
}