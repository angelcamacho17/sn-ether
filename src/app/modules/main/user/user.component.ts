import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public posts = [];
  constructor(public appService: AppService) {
    // console.log(this.appService.currentUserPosts);
  }

  ngOnInit(): void {
  }
}
