import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from './home.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public account = 0;
  public balance = 3036;
  constructor(public apService: AppService) { }

  async ngOnInit() {
    await this.apService.loadPost();
  }
}
