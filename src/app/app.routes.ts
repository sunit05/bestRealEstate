import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LodhaLumis } from './pages/lodha-lumis/lodha-lumis';
import { Manhattan } from './pages/manhattan/manhattan';
import { Runwal } from './pages/runwal/runwal';
import { Amaltis } from './pages/amaltis/amaltis';


export const routes: Routes = [
  { path: '', component: HomeComponent },   // for <app-home>
  { path: 'lodha-lumis', component: LodhaLumis },
  { path: 'manhattan', component: Manhattan },
  { path: 'runwal', component: Runwal },
  { path: 'amaltis', component: Amaltis },
  { path: 'schedule-visit', component: Amaltis }
];
