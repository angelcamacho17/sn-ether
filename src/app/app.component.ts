import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { AppService } from './app.service';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

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
