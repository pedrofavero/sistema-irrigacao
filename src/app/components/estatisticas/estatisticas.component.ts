import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.scss']
})
export class EstatisticasComponent implements OnInit {
  ngOnInit() {
    // Aqui podemos adicionar a lógica para carregar os dados reais
  }
} 