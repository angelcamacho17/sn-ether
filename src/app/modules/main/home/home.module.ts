import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomeService } from './home.service';
import { MaterialModule } from '../../shared/material/material.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    SharedModule,
    MaterialModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
