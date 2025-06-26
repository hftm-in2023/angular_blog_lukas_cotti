import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
interface BlogEntry {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  content: string;
  comments: any[];
  createdAt: string;
  createdByMe: boolean;
  likedByMe: boolean;
  likes: number;
  updatedAt: string;
}
@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blogEntry: BlogEntry | undefined;
  isLoading = true;
  errorMessage: string | undefined;
  private apiUrl = '/api/entries';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.isLoading = true;
        this.errorMessage = undefined;
        const id = params.get('id'); 
        if (id) {
          console.log(`Loading Blog with Id: ${id}`);
          const numericId = parseInt(id, 10);
          if (isNaN(numericId)) {
            console.error('Invalid Id param:', id);
            this.errorMessage = 'Invalid Id';
            this.isLoading = false;
            return of(undefined);
          }

          return this.http.get<BlogEntry>(`${this.apiUrl}/${numericId}`).pipe(
            catchError(error => {
              console.error('Cloud not load Details:', error);
              this.errorMessage = 'Could not load Details.';
              this.isLoading = false;
              return of(undefined);
            })
          );
        } else {
          this.errorMessage = 'Missing id';
          this.isLoading = false;
          return of(undefined);
        }
      })
    ).subscribe(entry => {
      this.blogEntry = entry;
      this.isLoading = false;
      if (!this.blogEntry) {
        this.errorMessage = this.errorMessage || 'Blog entry not found';
      } else {
        console.log('Loaded details:', this.blogEntry);
      }
    });
  }

  goToAllBlogs(): void {
    this.router.navigate(['/']);
  }
}