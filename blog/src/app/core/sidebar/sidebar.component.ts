import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink,
    RouterOutlet,   // ✅ Hier neu hinzugefügt
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    LayoutModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isLoggedIn = false;
  @Input() username: string | null = null;

  isHandset$: Observable<boolean>;

  constructor(protected breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches),
      shareReplay()
    );
  }

  onLogin() {
    // TODO: Login-Logik
  }

  onLogout() {
    // TODO: Logout-Logik
  }

  onCreateBlog() {
    // TODO: Blog-Erstellungs-Logik
  }
}
