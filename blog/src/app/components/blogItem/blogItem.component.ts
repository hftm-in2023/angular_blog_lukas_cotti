import { Component, Input } from '@angular/core';

//material
import { MatCardModule } from '@angular/material/card';
import { BlogItem } from '../../types/blogItem';
import { MatIconButton } from '@angular/material/button';
import { formatDate } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatIconButton],
  templateUrl: './blogItem.component.html',
  styleUrls: ['./blogItem.component.scss'],
})
export class BlogItemComponent {
  @Input() blogItem!: BlogItem;
  protected readonly formatDate = formatDate;
}
