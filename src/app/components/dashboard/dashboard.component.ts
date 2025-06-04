import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IrrigacaoService } from '../../services/irrigacao.service';
import { interval, Subscription } from 'rxjs';

// Material Design
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatSnackBarModule,
    MatDividerModule,
    MatMenuModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  umidade: number = 0;
  bombaLigada: boolean = false;
  limiarUmidade: number = 40;
  private statusSubscription?: Subscription;
  private atualizacaoSubscription?: Subscription;

  constructor(
    private irrigacaoService: IrrigacaoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.atualizarStatus();
    this.iniciarAtualizacaoAutomatica();
  }

  ngOnDestroy() {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
    if (this.atualizacaoSubscription) {
      this.atualizacaoSubscription.unsubscribe();
    }
  }

  private iniciarAtualizacaoAutomatica() {
    this.atualizacaoSubscription = interval(30000).subscribe(() => {
      this.atualizarStatus();
    });
  }

  private atualizarStatus() {
    this.statusSubscription = this.irrigacaoService.getStatus().subscribe({
      next: (status) => {
        this.umidade = status.umidade;
        this.bombaLigada = status.bomba === 1;
      },
      error: (erro) => {
        this.mostrarErro('Erro ao obter status do sistema');
        console.error('Erro ao obter status:', erro);
      }
    });
  }

  salvarLimiar() {
    this.irrigacaoService.setLimiar(this.limiarUmidade).subscribe({
      next: () => {
        this.mostrarSucesso('Limiar atualizado com sucesso');
      },
      error: (erro) => {
        this.mostrarErro('Erro ao atualizar limiar');
        console.error('Erro ao atualizar limiar:', erro);
      }
    });
  }

  controlarBomba(acao: 'ligar' | 'desligar') {
    this.irrigacaoService.comandoBomba(acao).subscribe({
      next: () => {
        this.bombaLigada = acao === 'ligar';
        this.mostrarSucesso(`Bomba ${acao === 'ligar' ? 'ligada' : 'desligada'} com sucesso`);
      },
      error: (erro) => {
        this.mostrarErro(`Erro ao ${acao} a bomba`);
        console.error(`Erro ao ${acao} a bomba:`, erro);
      }
    });
  }

  private mostrarSucesso(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-sucesso']
    });
  }

  private mostrarErro(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-erro']
    });
  }
}
