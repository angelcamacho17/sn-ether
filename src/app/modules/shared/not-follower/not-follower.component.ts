import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-not-follower',
  templateUrl: './not-follower.component.html',
  styleUrls: ['./not-follower.component.scss']
})
export class NotFollowerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotFollowerComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(result: string): void {
    this.dialogRef.close({result});
  }

}
