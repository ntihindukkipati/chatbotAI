import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {LDashboardComponent} from './l-dashboard/l-dashboard.component';
import {GDashboardComponent} from './g-dashboard/g-dashboard.component';
import {ProfDashboardComponent} from './prof-dashboard/prof-dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'l-dashboard', component: LDashboardComponent},
  { path: 'g-dashboard', component: GDashboardComponent},
  { path: 'prof-dashboard', component: ProfDashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
