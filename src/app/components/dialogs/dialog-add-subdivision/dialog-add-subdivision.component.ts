import { Component, OnInit } from '@angular/core';
import { SubdivisionDto } from 'src/app/models/Dtos/subdivision.model';
import { MatDialogRef } from '@angular/material';
import { SubdivisionsService } from 'src/app/services/subdivisions.service';

@Component({
  selector: 'app-dialog-add-subdivision',
  templateUrl: './dialog-add-subdivision.component.html',
  styleUrls: ['./dialog-add-subdivision.component.scss']
})
export class DialogAddSubdivisionComponent implements OnInit {

  public name: string;
  subdivision: SubdivisionDto;
  isError: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddSubdivisionComponent>,private subdivisionService: SubdivisionsService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.name) {
      this.subdivision = {
        name: this.name,
        id: null
      };
      this.subdivisionService.addSubdivision(this.subdivision);
      this.dialogRef.close();
    }
    else {
      this.isError = true;
    }

  }

}
