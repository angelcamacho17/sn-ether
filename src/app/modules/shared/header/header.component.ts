import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import Identicon from 'identicon.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() account = '';
  @Input() balance = '';
  public img = null;

  constructor() {
  }
  
  ngOnInit(): void {
  }
  
  ngOnChanges(value): void {
    if (value && value.account && value.account.currentValue) {
      this.account = value.account.currentValue;
      this.img = new Identicon(this.account, 420).toString();
    }
  }

}
