import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

export const routes: Routes = [
  { path: '', component: BlogListComponent, title: 'Blog-Übersicht' },
  { path: 'detail/:id', component: BlogDetailComponent, title: 'Blog-Details' },
  { path: '**', redirectTo: '' }
];