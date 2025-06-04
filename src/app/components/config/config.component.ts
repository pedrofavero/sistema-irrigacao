import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { IrrigacaoService } from '../../services/irrigacao.service';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
  ipAddress: string = '';
  intervaloLeitura: number = 60;
  tempoMaxIrrigacao: number = 10;
  calibracaoMin: number = 0;
  calibracaoMax: number = 4095;

  constructor(
    private irrigacaoService: IrrigacaoService,
    private snackBar: MatSnackBar
  ) { }

  salvarConfiguracoes() {
    // Implementar lógica de salvar configurações
    this.mostrarMensagem('Configurações salvas com sucesso');
  }

  testarConexao() {
    // Implementar lógica de teste de conexão
    this.mostrarMensagem('Conexão testada com sucesso');
  }

  calibrarSensor() {
    // Implementar lógica de calibração
    this.mostrarMensagem('Sensor calibrado com sucesso');
  }

  private mostrarMensagem(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
} 