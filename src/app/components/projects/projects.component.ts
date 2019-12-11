import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DepartmentDto } from 'src/app/models/Dtos/department.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects.service';
import { DepartmentsService } from 'src/app/services/departments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  department: DepartmentDto;

  displayedColumns: string[] = ['id', 'title'];
  projects = new MatTableDataSource([]);
  searchValue = '';

  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(private projectsService: ProjectsService,
    private departmentsService: DepartmentsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.departmentsService.getDepartment(this.route.snapshot.params.id).subscribe(d => {
      this.department = d;

      this.projectsService.getDepartmentProjects(this.department.id).subscribe(p => {
        this.projects.data = p;
      });
    });

    this.projects.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.projects.filter = filterValue.trim().toLowerCase();
  }

  open(id: number) {
    this.router.navigate(['/tasks/' + id.toString()]);
  }
}
