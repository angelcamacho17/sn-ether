import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './modules/main/user/user.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/main/user/user.module').then(m => m.UserModule),
    canActivate: [UserGuard]
  },
  {
    path: 'notrunning',
    loadChildren: () =>
      import('./modules/not-running/not-running/not-running.module').then(m => m.NotRunningModule)
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
