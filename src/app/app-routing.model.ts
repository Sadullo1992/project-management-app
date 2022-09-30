import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './app-pages/components/not-found/not-found.component';


const routes: Routes = [
  // http://localhost:4200
  { path: '', loadChildren: () => import('./app-pages/app-pages.module').then(m => m.AppPagesModule) },
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },


  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
