import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.scss']
})
export class PostInputComponent implements OnInit {

  constructor(private _apService: AppService) { }

  ngOnInit(): void {
  }

  createPost(content: string): void {
    this._apService.createPost(content);
  }

}
