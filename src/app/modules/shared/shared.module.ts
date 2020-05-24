import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PostInputComponent } from './post-input/post-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { PostComponent } from './post/post.component';
import { PublicPostComponent } from './public-post/public-post.component';
import { PrivatePostComponent } from './private-post/private-post.component';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    HeaderComponent,
    PostInputComponent,
    PostComponent,
    PublicPostComponent,
    PrivatePostComponent
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
    PostComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
