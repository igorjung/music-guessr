import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent, HomeComponent } from './pages';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: ':id',
  component: ArtistComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
