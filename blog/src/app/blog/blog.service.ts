import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface BlogEntry {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private baseUrl = 'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<BlogEntry[]> {
    return this.http.get<BlogEntry[]>(`${this.baseUrl}/blogs`).pipe(
      map(blogs => blogs.filter(blog => blog.id && blog.title && blog.content))
    );
  }
}