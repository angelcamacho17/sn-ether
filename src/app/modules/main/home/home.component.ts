import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from './home.service';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material/dialog';
import { PublicPostComponent } from '../../shared/public-post/public-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public account = 0;
  public balance = 3036;
  constructor(public apService: AppService,
              public dialog: MatDialog) { }

  async ngOnInit() {
    await this.apService.loadPost();
  }

  public createPublicPost() {
    const dialogRef = this.dialog.open(PublicPostComponent);
  }
}
