import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { MonedaService } from '../../servicios/moneda.service';

export interface Moneda {
  nombre: string;
  cantidad: number;
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
  @ViewChild('monedaCantidad') monedaCantidad!: ElementRef;

  @Output() monedasActualizadas = new EventEmitter<Moneda[]>();

  editandoIndex: number | null = null;

  constructor(private monedaService: MonedaService) {}

  ngOnInit() {
    this.monedaService.monedas$.subscribe((monedas) => {
      this.monedas = monedas;
      this.monedasActualizadas.emit(this.monedas);
    });
  }

  agregarMoneda(nombre: string) {
    if (nombre != '') {
      const nuevaMoneda: Moneda = {
        nombre: nombre,
        cantidad: Number.parseInt(this.monedaCantidad.nativeElement.value),
      };
      this.monedaService.agregarMoneda(nuevaMoneda);
      this.monedasActualizadas.emit(this.monedas);
    }
  }

  borrarMoneda(index: number) {
    this.monedaService.borrarMoneda(index);
    this.monedasActualizadas.emit(this.monedas);
  }

  editarMoneda(index: number, moneda: Moneda) {
    this.monedaService.editarMoneda(index, moneda);
    this.monedasActualizadas.emit(this.monedas);
  }

  editarFila(index: number) {
    this.editandoIndex = index;
    const moneda = this.monedas[index];
    this.monedaNombre.nativeElement.value = moneda.nombre;
    this.monedaCantidad.nativeElement.value = moneda.cantidad;
  }

  guardarEdicion() {
    if (this.editandoIndex !== null) {
      const nombre = this.monedaNombre.nativeElement.value;
      const cantidad = this.monedaCantidad.nativeElement.value;

      if (nombre != '') {
        const monedaEditada: Moneda = {
          nombre,
          cantidad: Number.parseInt(this.monedaCantidad.nativeElement.value),
        };
        this.monedaService.editarMoneda(this.editandoIndex, monedaEditada);
        this.monedasActualizadas.emit(this.monedas);
        this.editandoIndex = null;
        this.monedaNombre.nativeElement.value = '';
        this.monedaCantidad.nativeElement.value = '';
      }
    }
  }
}
