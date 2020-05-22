import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public socialNetwork: any;
  public postCount = 0;
  public posts: any;

  constructor(public apService: AppService) { }
}
