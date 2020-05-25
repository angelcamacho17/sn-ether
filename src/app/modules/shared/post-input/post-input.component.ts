import { Component, OnInit, Input, Inject } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
              private _apService: AppService) {

  }

  ngOnInit(): void {
  }

  createPost(content: string): void {
    this._apService.createPost(content, (this.privacy === 'public'));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(result: string): void {
    this.dialogRef.close({result});
  }

}
