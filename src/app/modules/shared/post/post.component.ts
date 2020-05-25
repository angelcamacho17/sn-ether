import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import Identicon from 'identicon.js';
import { AppService } from 'src/app/app.service';
import { FormControl, Validators } from '@angular/forms';
import { isNumber } from 'util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit,  OnChanges {

  @Input() post: any;
  public img = null;
  public tipAmount = null;
  public tipControl = null;
  public noValidTip = null;
  // tslint:disable-next-line: variable-name
  private _subscriptions = new Subscription();

  constructor(private _apService: AppService,
              private _snackBar: MatSnackBar,
              private _router: Router) {
    this.tipControl = new FormControl('', [
       ]);
  }

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

  public tipPost(tip): void {
    if (!String(tip).match(new RegExp(/^[0-9]*\.?[0-9]*$/g))) {
      this._snackBar.open('Your tip should be only numbers!', 'Dismiss', {
        duration: 3000,
      });
      return;
    } else {
      this._snackBar.open('Your tip has been send!', 'Dismiss', {
        duration: 3000,
      });
      this._apService.tipPost(this.post.id, tip);
    }
  }

  public goToUsersPosts(): void {
    this._apService.setProfileWatched(this.post.author);
    this._apService.getProfilePosts();
  }
}
