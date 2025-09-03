import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
} from '@angular/router';
import { BlogItem } from '../../../types/blogItem';
import { inject } from '@angular/core';
import { ErrorService } from '../../../services/error.service';

export const blogPostResolver: ResolveFn<
  Promise<BlogItem | null | RedirectCommand>
> = async (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id');
  const errorService = inject(ErrorService);

  try {
    const res = await fetch(`/api/entries/${id}`);

    if (!res.ok) {
      errorService.report('An error occurred while loading the blog post.');
      console.error(`Failed to fetch blog post: ${res.status}`);
      return null;
    }

    return await res.json().then((res: BlogItem) => {
      // Optionally enrich blogItem here
      res.headerImageUrl = `https://picsum.photos/800/300?random=${Math.random()}`;
      res.authorAvatar = `https://picsum.photos/100?random=${Math.random()}`;

      return res;
    });
  } catch (err) {
    errorService.report('An error occurred while loading the blog post.');
    console.error(err);
    return null;
  }
};
