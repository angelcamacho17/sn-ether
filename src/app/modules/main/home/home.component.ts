import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material/dialog';
import { PostInputComponent } from '../../shared/post-input/post-input.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public account = 0;
  public balance = 3036;
  // tslint:disable-next-line: variable-name
  private _subscriptions = new Subscription();

  constructor(public appService: AppService,
              public dialog: MatDialog,
              // tslint:disable-next-line: variable-name
              private _router: Router) {
    this._subscriptions.add(this.appService.profilePostsFetched$.subscribe(() => {
      this._router.navigate(['/user']);
    }));
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }


  async ngOnInit() {
    await this.appService.loadPost();
  }

  public createPost() {
    const dialogRef = this.dialog.open(PostInputComponent);
  }
}
