import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { BlogItem } from '../../../types/blogItem';
import { inject } from '@angular/core';
import { ErrorService } from '../../../services/error.service';

export const blogOverviewResolver: ResolveFn<Promise<BlogItem[]>> = async (
  route: ActivatedRouteSnapshot,
) => {
  console.log(route.paramMap.get('id'));
  const errorService = inject(ErrorService);

  try {
    const res = await fetch('/api/entries');
    const json = await res.json();

    const blogItems = json.data as BlogItem[];
    blogItems.forEach((item: BlogItem) => {
      item.headerImageUrl = `https://picsum.photos/200/100?random=${Math.random()}`;
      item.authorAvatar = `https://picsum.photos/200?random=${Math.random()}`;
    });

    return blogItems;
  } catch (err) {
    errorService.report('An error occurred while loading the blog overveiw.');
    console.error(err);
    return [];
  }
};
