import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="over" class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active" (click)="sidenav.close()">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          
          <a mat-list-item routerLink="/estatisticas" routerLinkActive="active" (click)="sidenav.close()">
            <mat-icon matListItemIcon>analytics</mat-icon>
            <span matListItemTitle>Estatísticas</span>
          </a>
          
          <a mat-list-item routerLink="/agendamento" routerLinkActive="active" (click)="sidenav.close()">
            <mat-icon matListItemIcon>schedule</mat-icon>
            <span matListItemTitle>Agendamento</span>
          </a>
          
          <a mat-list-item routerLink="/config" routerLinkActive="active" (click)="sidenav.close()">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Configurações</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="toolbar">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          
          <span class="title">Sistema de Irrigação</span>
          
          <span class="spacer"></span>
          
          <button mat-icon-button class="toolbar-icon">
            <mat-icon>notifications</mat-icon>
          </button>
        </mat-toolbar>

        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
    }

    .toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }

    .title {
      margin-left: 1rem;
      font-size: 1.2rem;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .content {
      margin-top: 64px;
      height: calc(100vh - 64px);
      overflow-y: auto;
    }

    mat-nav-list {
      padding-top: 1rem;

      a {
        margin: 0.5rem 0;
        border-radius: 0 24px 24px 0;
        margin-right: 1rem;

        &.active {
          background: rgba(25, 118, 210, 0.1);
          color: #1976d2;

          mat-icon {
            color: #1976d2;
          }
        }
      }
    }

    @media (max-width: 599px) {
      .content {
        margin-top: 56px;
        height: calc(100vh - 56px);
      }
    }
  `]
})
export class AppComponent {
  title = 'Sistema de Irrigação';
}
