import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [/*{
  path: "home",
  component: HomeComponent
},*/{
  path: "***",
  redirectTo: "home"
},
  { path: 'users',
  loadChildren: () => import('./Pages/users/users.module').then(m => m.UsersModule) },
  { path: 'home',
  loadChildren: () => import('./Pages/home/home.module').then(m => m.HomeModule) },
  { path: 'about',
  loadChildren: () => import('./Pages/about/about.module').then(m => m.AboutModule) },
  { path: 'computers',
  loadChildren: () => import('./Pages/computers/computers.module').then(m => m.ComputersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
