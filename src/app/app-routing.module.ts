import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfigComponent } from './components/config/config.component';
import { EstatisticasComponent } from './components/estatisticas/estatisticas.component';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'estatisticas', component: EstatisticasComponent },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 