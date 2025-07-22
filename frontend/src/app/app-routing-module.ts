import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Movies } from './movies/movies';
import { Upload } from './upload/upload';
import { Create } from './movies/create/create';
import { Edit } from './movies/edit/edit';
import { Delete } from './movies/delete/delete';
import { MoviesOutsera } from './moviesoutsera/movies';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'movies',
    component: Movies
  },
  {
    path: 'movies-create',
    component: Create
  },
  {
    path: 'movies-edit',
    component: Edit
  },
  {
    path: 'movies-delete',
    component: Delete
  },
  {
    path: 'upload',
    component: Upload
  },
  {
    path: 'moviesoutsera',
    component: MoviesOutsera
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
