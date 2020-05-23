import { Component, OnInit, Input, OnChanges } from '@angular/core';
import Identicon from 'identicon.js';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnChanges {

  @Input() post: any;
  public img = null;
  public tipAmount = null;

  constructor(private _apService: AppService) { }

  ngOnInit(): void {
  }

  ngOnChanges(value): void {
    const web3 = window.web3;

    if (value && value.post && value.post.currentValue) {
      this.post.author = value.post.currentValue.author;
      this.img = new Identicon(this.post.author, 420).toString();
      // tslint:disable-next-line: no-bitwise
      this.post.tipAmount = value.post.currentValue.tipAmount.toString() / (1000000000000000000);
    }
  }

  public tipPost(): void {
    this._apService.tipPost(this.post.id);
  }

}
