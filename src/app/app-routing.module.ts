import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./modules/main/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/main/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
