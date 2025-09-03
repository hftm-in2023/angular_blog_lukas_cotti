import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';

//material
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from './services/error.service';

registerLocaleData(localeDeCh, 'de-CH');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCardModule, MatToolbar, MatIcon, MatIconButton, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private snackBar = inject(MatSnackBar);
  private errorService = inject(ErrorService);

  constructor() {
    this.errorService.error$.subscribe((message) => {
      this.snackBar.open(message, 'Dismiss', {
        duration: 4000,
        panelClass: ['mat-warn'],
      });
    });
  }
}
