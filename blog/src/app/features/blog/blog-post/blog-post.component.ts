import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogItem } from '../../../types/blogItem';

@Component({
  standalone: true,
  selector: 'app-blog-post',
  imports: [CommonModule],
  template: `
    <h2>Blog Post</h2>
    <pre>{{ blogPost | json }}</pre>
  `,
})
export class BlogPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  blogPost: BlogItem | undefined;

  ngOnInit() {
    this.blogPost = this.route.snapshot.data['blogData'];
  }
}
