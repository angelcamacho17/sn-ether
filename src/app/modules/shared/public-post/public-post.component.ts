import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-public-post',
  templateUrl: './public-post.component.html',
  styleUrls: ['./public-post.component.scss']
})
export class PublicPostComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PublicPostComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(result: string): void {
    this.dialogRef.close({result});
  }

}
