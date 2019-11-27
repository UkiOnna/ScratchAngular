import { Component, OnInit, Inject } from '@angular/core';
import { SubdivisionDto } from 'src/app/models/Dtos/subdivision.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubdivisionsService } from 'src/app/services/subdivisions.service';

@Component({
  selector: 'app-dialog-add-subdivision',
  templateUrl: './dialog-add-subdivision.component.html',
  styleUrls: ['./dialog-add-subdivision.component.scss']
})
export class DialogAddSubdivisionComponent implements OnInit {

  public name: string;
  subdivisions: SubdivisionDto[] = [];
  subdivision: SubdivisionDto;
  isError: boolean = false;
  isEdit: boolean = false;
  isSubdivisionChoosed: boolean = true;
  selectedSubdivisionId: number = null;

  constructor(public dialogRef: MatDialogRef<DialogAddSubdivisionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private subdivisionService: SubdivisionsService) { }

  ngOnInit() {
    this.isEdit = this.data["isEdit"];
    if (this.isEdit) {
      this.isSubdivisionChoosed = false;
      this.subdivisionService.getSubdivisions().subscribe(subs => {
        this.subdivisions = subs;
      });
    }
  }

  subDivisionChanged(value): void {
    this.selectedSubdivisionId = value;
    this.subdivisionService.getSubdivison(value).subscribe(subs => {
      this.selectedSubdivisionId = subs.id;
    });
    this.isSubdivisionChoosed = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.name) {
      this.subdivision = {
        name: this.name,
        id: this.selectedSubdivisionId
      };
      if (this.selectedSubdivisionId) {
        this.subdivisionService.updateSubdivision(this.subdivision);
        this.dialogRef.close();
        return;
      }
      this.subdivisionService.addSubdivision(this.subdivision);
      this.dialogRef.close();
      return;
    }
    this.isError = true;
  }

}
