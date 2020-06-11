import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public apService: AppService) {

  }

  async ngOnInit() {
    await this.apService.loadWeb3();
    await this.apService.loadBlockchainData();
  }
}
