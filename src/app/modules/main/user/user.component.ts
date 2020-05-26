import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotFollowerComponent } from '../../shared/not-follower/not-follower.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public posts = [];
  // tslint:disable-next-line: variable-name
  private _subscriptions = new Subscription();
  public notShowWarn = false;
  @Input() user: any;
  @Input() img: any;

  constructor(public appService: AppService,
              public dialog: MatDialog,
              // tslint:disable-next-line: variable-name
              private _router: Router) {
    this._subscriptions.add(this.appService.profilePostsFetched$.subscribe((data) => {
      this.user = this.appService.profileWatched;
      this.img = this.appService.profileImg;
    }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  public checkFollower(event): void {

    if (this.notShowWarn) {
      return;
    }
    const dialogRef = this.dialog.open(NotFollowerComponent, {
      width: '480px',
      height: '448px'
    });

    dialogRef.afterClosed().subscribe(data => {
      this.notShowWarn = true;
    });
  }
}
