import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs'; 
interface BlogEntry {
  id: number;
  title: string;
  author: string;
  publishDate: string;
}
interface BackendResponse {
  data: BlogEntry[];
  maxPageSize: number;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}
@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  title = 'Blog-Overview';
  blogEntries: BlogEntry[] = [];
  isLoading = true;
  errorMessage: string | undefined;
  private apiUrl = '/api/entries';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBlogEntries();
  }

  loadBlogEntries(): void {
    console.log('Start backend call: ' + this.apiUrl);
    this.isLoading = true;
    this.errorMessage = undefined;
    this.http.get<BackendResponse>(this.apiUrl).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Faild loading blogs', error);
        this.errorMessage = 'Could not load Blogs.';
        this.isLoading = false;
        return of([]);
      })
    ).subscribe({
      next: (data: BlogEntry[]) => {
        this.blogEntries = data;
        this.isLoading = false;
        console.log('Backend response:', this.blogEntries);
        if (this.blogEntries.length === 0) {
          this.errorMessage = 'No Blog entries found.';
        }
      },
      error: () => {},
      complete: () => {
        console.log('Loaded Blogs');
      }
    });
  }
}