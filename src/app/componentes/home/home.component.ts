import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private apiService: ApiService) {
    moment.locale('es');
  }
  tasaDeCambio: any = {};
  filas: {
    fecha: string;
    concepto: string;
    valor: number;
    moneda: string;
  }[] = [];
  monedas: string[] = ['USD', 'EUR', 'BRL', 'UYU'];
  nuevaFila = { fecha: '', concepto: '', valor: 0, moneda: 'USD' };
  listaMonedas: string[] = [];
  monedaSeleccionada: string = '';
  editIndex: number | null = null;

  ngOnInit() {
    this.apiService.getTasaDeCambio().subscribe((data) => {
      this.tasaDeCambio = data.rates;
      this.listaMonedas = Object.keys(this.tasaDeCambio);
    });
  }

  agregarMoneda() {
    if (
      this.monedaSeleccionada &&
      !this.monedas.includes(this.monedaSeleccionada)
    ) {
      this.monedas.push(this.monedaSeleccionada);
    }
  }

  agregarFila() {
    if (this.nuevaFila.concepto && this.nuevaFila.valor !== 0) {
      this.nuevaFila.fecha = moment().format('lll');
      this.filas.push({ ...this.nuevaFila });
      this.nuevaFila = {
        fecha: '',
        concepto: '',
        valor: 0,
        moneda: 'USD',
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
      this.nuevaFila = { fecha: '', concepto: '', valor: 0, moneda: 'USD' };
      this.editIndex = null;
    }
  }

  eliminarFila(index: number) {
    this.filas.splice(index, 1);
  }

  convertirADolares(valor: number, moneda: string) {
    const tasa = this.tasaDeCambio[moneda];
    return valor / tasa;
  }

  obtenerTotal() {
    return this.filas.reduce(
      (total, fila) => total + this.convertirADolares(fila.valor, fila.moneda),
      0
    );
  }
}
