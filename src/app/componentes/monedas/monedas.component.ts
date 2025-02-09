import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MonedaService } from '../../servicios/moneda.service';

export interface Moneda {
  nombre: string;
  valor: number;
}
@Component({
  selector: 'app-monedas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monedas.component.html',
  styleUrl: './monedas.component.css',
})
export class MonedasComponent implements OnInit {
  monedas: Moneda[] = [];

  @ViewChild('monedaNombre') monedaNombre!: ElementRef;
  @ViewChild('monedaValor') monedaValor!: ElementRef;

  editandoIndex: number | null = null;

  constructor(private monedaService: MonedaService) {}

  ngOnInit() {
    this.monedaService.monedas$.subscribe((monedas) => {
      this.monedas = monedas;
    });
  }

  agregarMoneda(nombre: string, valor: string) {
    if (Number(valor) > 0 && nombre != '') {
      const nuevaMoneda: Moneda = { nombre: nombre, valor: Number(valor) };
      this.monedaService.agregarMoneda(nuevaMoneda);
    }
  }

  borrarMoneda(index: number) {
    this.monedaService.borrarMoneda(index);
  }

  editarMoneda(index: number, moneda: Moneda) {
    this.monedaService.editarMoneda(index, moneda);
  }

  editarFila(index: number) {
    this.editandoIndex = index;
    const moneda = this.monedas[index];
    this.monedaNombre.nativeElement.value = moneda.nombre;
    this.monedaValor.nativeElement.value = moneda.valor;
  }

  guardarEdicion() {
    if (this.editandoIndex !== null) {
      const nombre = this.monedaNombre.nativeElement.value;
      const valor = this.monedaValor.nativeElement.value;

      if (Number(valor) > 0 && nombre != '') {
        const monedaEditada: Moneda = { nombre, valor: Number(valor) };
        this.monedaService.editarMoneda(this.editandoIndex, monedaEditada);
        this.editandoIndex = null;
        this.monedaNombre.nativeElement.value = '';
        this.monedaValor.nativeElement.value = "";
      }
    }
  }
}
