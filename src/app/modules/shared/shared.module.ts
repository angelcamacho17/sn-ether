import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PostInputComponent } from './post-input/post-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { PostComponent } from './post/post.component';
import { NotFollowerComponent } from './not-follower/not-follower.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PostInputComponent,
    PostComponent,
    NotFollowerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    HeaderComponent,
    PostInputComponent,
    PostComponent,
    NotFollowerComponent

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
