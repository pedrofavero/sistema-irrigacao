import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Agendamento {
  id: number;
  horario: string;
  duracao: number;
  diasSemana: string[];
  ativo: boolean;
}

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent {
  novoAgendamento: Partial<Agendamento> = {
    horario: '',
    duracao: 10,
    diasSemana: []
  };

  agendamentos: Agendamento[] = [
    {
      id: 1,
      horario: '06:00',
      duracao: 15,
      diasSemana: ['SEG', 'QUA', 'SEX'],
      ativo: true
    },
    {
      id: 2,
      horario: '18:00',
      duracao: 10,
      diasSemana: ['TER', 'QUI'],
      ativo: false
    }
  ];

  constructor(private snackBar: MatSnackBar) {}

  adicionarAgendamento() {
    if (!this.novoAgendamento.horario || !this.novoAgendamento.diasSemana?.length) {
      this.mostrarMensagem('Preencha todos os campos obrigatórios', true);
      return;
    }

    const novoId = Math.max(0, ...this.agendamentos.map(a => a.id)) + 1;
    
    this.agendamentos.push({
      id: novoId,
      horario: this.novoAgendamento.horario,
      duracao: this.novoAgendamento.duracao || 10,
      diasSemana: this.novoAgendamento.diasSemana,
      ativo: true
    });

    this.mostrarMensagem('Agendamento adicionado com sucesso');
    this.limparFormulario();
  }

  removerAgendamento(agendamento: Agendamento) {
    const index = this.agendamentos.findIndex(a => a.id === agendamento.id);
    if (index > -1) {
      this.agendamentos.splice(index, 1);
      this.mostrarMensagem('Agendamento removido com sucesso');
    }
  }

  toggleAgendamento(agendamento: Agendamento) {
    agendamento.ativo = !agendamento.ativo;
    this.mostrarMensagem(
      `Agendamento ${agendamento.ativo ? 'ativado' : 'desativado'} com sucesso`
    );
  }

  private limparFormulario() {
    this.novoAgendamento = {
      horario: '',
      duracao: 10,
      diasSemana: []
    };
  }

  private mostrarMensagem(mensagem: string, erro = false) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: erro ? ['snackbar-erro'] : ['snackbar-sucesso']
    });
  }
} 