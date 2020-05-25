import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  // tslint:disable-next-line: variable-name
  constructor(private _appService: AppService,
              // tslint:disable-next-line: variable-name
              private _router: Router) { }

    canActivate(): Observable<boolean | UrlTree> {
      if (this._appService.profileWatched === null) {
        this._router.navigate(['/home']);
      }

      return of(this._appService.profileWatched !== null);
    }
}
