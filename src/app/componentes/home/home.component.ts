import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { ApiService } from '../../servicios/api.service';
import { AgregarConceptoComponent } from '../agregar-concepto/agregar-concepto.component';
import { MonedasComponent } from '../monedas/monedas.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AgregarConceptoComponent,
    MonedasComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private apiService: ApiService) {
    moment.locale('es');
  }

  filas: {
    fecha: string;
    concepto: string;
    valor: number;
  }[] = [];

  irAMonedas: boolean = true;

  conceptos: string[] = ['Venta USD', 'Compra USD'];
  nuevaFila = { fecha: '', concepto: '', valor: 0 };
  monedaSeleccionada: string = '';
  editIndex: number | null = null;
  mostrarAgregarConcepto: boolean = false;

  agregarConcepto() {
    this.mostrarAgregarConcepto = true;
  }

  cerrarAgregarConcepto() {
    this.mostrarAgregarConcepto = false;
  }

  agregarFila() {
    if (this.nuevaFila.concepto && this.nuevaFila.valor !== 0) {
      this.nuevaFila.fecha = moment().format('lll');
      this.filas.push({ ...this.nuevaFila });
      this.nuevaFila = {
        fecha: '',
        concepto: '',
        valor: 0,
      };
    }
  }

  editarFila(index: number) {
    this.editIndex = index;
    this.nuevaFila = { ...this.filas[index] };
  }

  guardarEdicion() {
    if (this.editIndex !== null) {
      this.filas[this.editIndex] = { ...this.nuevaFila };
      this.nuevaFila = { fecha: '', concepto: '', valor: 0 };
      this.editIndex = null;
    }
  }

  eliminarFila(index: number) {
    this.filas.splice(index, 1);
  }

  actualizarConceptos(nuevoConcepto: string) {
    console.log('nuevoConcepto', nuevoConcepto);
    this.conceptos.push(nuevoConcepto);
  }

  getUltimaFila() {
    return this.filas.length > 0 ? this.filas[this.filas.length - 1] : null;
  }

  agregarOperacion() {
    // if (this.getUltimaFila()?.concepto == 'Venta USD') {
    //   this.filas.push({
    //     fecha: moment().format('lll'),
    //     concepto: 'Venta USD',
    //     valor: this.nuevaFila.valor * this.moneda.valor,
    //   });
    // }
  }

  mostrarMonedas() {
    this.irAMonedas = true;
  }

  cerrarMonedas() {
    this.irAMonedas = false;
  }
}
