import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotRunningComponent } from './not-running.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [NotRunningComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: NotRunningComponent }]),
    SharedModule,
    MaterialModule
  ]
})

export class NotRunningModule { }
