import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Sidebar } from './sidebar/sidebar';
import { Home } from './home/home';
import { Movies } from './movies/movies';
import { Upload } from './upload/upload';
import { Create } from './movies/create/create';
import { Edit } from './movies/edit/edit';
import { Delete } from './movies/delete/delete';

import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    Sidebar,
    Home,
    Movies,
    Upload,
    Create,
    Edit,
    Delete
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
  ],
  bootstrap: [App]
})
export class AppModule { }
