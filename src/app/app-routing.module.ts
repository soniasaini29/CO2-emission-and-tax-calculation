import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatesComponent } from './states/states.component';
import { singleStateComponent } from './single-state/single-state.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/states', pathMatch: 'full' },
    {
        path: 'states',
        component: StatesComponent
    },
    {
      path: 'single-state',
      component: singleStateComponent
  },
  { path: 'states/:id', component: singleStateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
