import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Moneda } from '../componentes/monedas/monedas.component';

@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  constructor() {}

  private monedaSubject = new BehaviorSubject<Moneda[]>([
    { nombre: 'ARS', cantidad: 0 },
  ]);
  monedas$ = this.monedaSubject.asObservable();

  private getMonedas(): Moneda[] {
    return this.monedaSubject.getValue();
  }

  agregarMoneda(moneda: Moneda) {
    const monedasActualizadas = [...this.getMonedas(), moneda];
    this.monedaSubject.next(monedasActualizadas);
  }

  borrarMoneda(index: number) {
    const monedasActualizadas = this.getMonedas().filter((_, i) => i !== index);
    this.monedaSubject.next(monedasActualizadas);
  }

  editarMoneda(index: number, moneda: Moneda) {
    const monedasActualizadas = this.getMonedas().map((m, i) =>
      i === index ? { ...moneda } : m
    );
    this.monedaSubject.next(monedasActualizadas);
  }
}
