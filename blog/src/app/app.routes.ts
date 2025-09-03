import { Routes } from '@angular/router';
import { blogOverviewResolver } from './features/blog/blog-overview/blog-overview.resolver';
import { blogPostResolver } from './features/blog/blog-post/blog-post.resolver';

export const routes: Routes = [
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./features/blog/blog-post/blog-post.component').then(
        (m) => m.BlogPostComponent,
      ),
    resolve: {
      blogData: blogPostResolver,
    },
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./features/blog/blog-overview/blog-overview.component').then(
        (m) => m.BlogOverviewComponent,
      ),
    resolve: {
      overviewData: blogOverviewResolver,
    },
  },
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
];
