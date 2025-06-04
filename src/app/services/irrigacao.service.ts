import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface StatusIrrigacao {
  umidade: number;
  bomba: number;
}

interface ConfigLimiar {
  limiar: number;
}

interface ComandoBomba {
  acao: 'ligar' | 'desligar';
}

@Injectable({
  providedIn: 'root'
})
export class IrrigacaoService {
  private apiUrl = 'http://192.168.4.1';  // Altere para o IP do seu ESP32

  constructor(private http: HttpClient) { }

  getStatus(): Observable<StatusIrrigacao> {
    return this.http.get<StatusIrrigacao>(`${this.apiUrl}/status`);
  }

  setLimiar(limiar: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/config/limiar`, { limiar });
  }

  comandoBomba(acao: 'ligar' | 'desligar'): Observable<any> {
    return this.http.post(`${this.apiUrl}/comando`, { acao });
  }
} 