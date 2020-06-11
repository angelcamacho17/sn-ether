import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  publicPost: boolean;
}

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.scss']
})
export class PostInputComponent implements OnInit {
  privacy: 'public' | 'private' = 'public';

  constructor(public dialogRef: MatDialogRef<PostInputComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              // tslint:disable-next-line: variable-name
              private _apService: AppService,
              // tslint:disable-next-line: variable-name
              private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  createPost(content: string): void {
    this._apService.createPost(content, (this.privacy === 'public'));
    this._snackBar.open('Wait until your transaction is finished and refresh to watch your post!', 'OK', {
      duration: 5000,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(result: string): void {
    this.dialogRef.close({result});
  }

}
