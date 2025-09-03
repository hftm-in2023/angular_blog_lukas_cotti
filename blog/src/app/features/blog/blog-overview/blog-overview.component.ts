import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogItemComponent } from '../../../components/blogItem/blogItem.component';
import { BlogItem } from '../../../types/blogItem';

@Component({
  standalone: true,
  selector: 'app-blog-overview',
  imports: [CommonModule, BlogItemComponent, RouterLink],
  templateUrl: './blog-overview.component.html',
})
export class BlogOverviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  blogItems: BlogItem[] = [];

  ngOnInit() {
    this.blogItems = this.route.snapshot.data['overviewData'];
  }
}
