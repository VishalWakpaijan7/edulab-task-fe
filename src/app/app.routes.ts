import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'principle-dashboard',
    pathMatch:'full'
  },
  {
    path: 'principle-dashboard',
    loadComponent: () => import('../components/principle-dashboard/principle-dashboard.component').then((m) => m.PrincipleDashboardComponent),
    pathMatch:'full'
  },
  {
    path:'**',
    loadComponent: () => import('../components/not-found-404/not-found-404.component').then((m) => m.NotFound404Component),
    pathMatch:'full'
  }
];
