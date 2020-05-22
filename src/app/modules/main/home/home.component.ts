import { Component, OnInit, Input } from '@angular/core';
import Web3 from 'web3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public account = 0;
  public balance = 3036;

  constructor() { }

}
