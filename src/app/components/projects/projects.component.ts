import { Component, OnInit, Input } from '@angular/core';
import { DepartmentDto } from 'src/app/models/Dtos/department.model';
import { MatTableDataSource } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @Input() department: DepartmentDto;

  displayedColumns: string[] = ['id', 'title'];
  projects = new MatTableDataSource([]);
  searchValue = '';

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getDepartmentProjects(this.department.id).subscribe(result => {
      this.projects.data = result;
    });
  }

  applyFilter(filterValue: string) {
    this.projects.filter = filterValue.trim().toLowerCase();
  }
}
