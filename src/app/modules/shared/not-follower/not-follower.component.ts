import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-not-follower',
  templateUrl: './not-follower.component.html',
  styleUrls: ['./not-follower.component.scss']
})
export class NotFollowerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotFollowerComponent>,
              private _appService: AppService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(result: string): void {
    this.dialogRef.close({result});
  }

  public follow(): void {
    this._appService.follow();
  }

}
