import { CommonModule } from '@angular/common';
import { Component, NgModule, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import {
  AgregarConceptoComponent,
  Concepto,
} from '../agregar-concepto/agregar-concepto.component';
import { Moneda, MonedasComponent } from '../monedas/monedas.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AgregarConceptoComponent,
    MonedasComponent,
  ],
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
})
export class MovimientosComponent {
  constructor(private route: ActivatedRoute) {
    this.monedas = this.route.snapshot.data['monedas'];
    console.log('this.monedas', this.monedas);
    moment.locale('es');
  }

  filas: {
    fecha: string;
    concepto: Concepto;
    moneda: string;
    cotizacion: number | string;
    cantidad: number;
  }[] = [];

  mostrarMonedas: boolean = false;
  monedas: Moneda[] = [];

  conceptos: Concepto[] = [
    { nombre: 'Venta', esIngreso: true },
    { nombre: 'Compra', esIngreso: false },
  ];

  nuevaFila: {
    fecha: string;
    concepto: Concepto;
    cotizacion: number | string;
    moneda: string;
    cantidad: number;
  } = {
    fecha: '',
    concepto: this.conceptos[0],
    cotizacion: 0,
    moneda: 'string',
    cantidad: 0,
  };

  monedaSeleccionada: string = '';
  editIndex: number | null = null;
  mostrarAgregarConcepto: boolean = false;


  toggleFormConceptos() {
    this.mostrarAgregarConcepto = !this.mostrarAgregarConcepto;
  }

  agregarFila() {
    if (this.nuevaFila.concepto && this.nuevaFila.cotizacion !== 0)
      if (
        (this.nuevaFila.concepto.nombre === 'Compra' ||
          this.nuevaFila.concepto.nombre === 'Venta') &&
        this.nuevaFila.moneda === 'ARS'
      ) {
        alert('No se pueden realizar Compras o Ventas en ARS.');
        return;
      }

    {
      if (!this.nuevaFila.moneda && this.monedas.length > 0) {
        this.nuevaFila.moneda = this.monedas[0].nombre;
      }

      this.nuevaFila.fecha = moment().format('lll');
      this.filas.push({ ...this.nuevaFila });
      this.nuevaFila = {
        fecha: '',
        concepto: { nombre: '', esIngreso: false },
        cotizacion: 0,
        cantidad: 0,
        moneda: this.monedas.length > 0 ? this.monedas[0].nombre : '',
      };
      this.agregarOperacion();
    }
  }

  editarFila(index: number) {
    this.editIndex = index;
    this.nuevaFila = { ...this.filas[index] };
  }

  guardarEdicion() {
    if (this.editIndex !== null) {
      this.filas[this.editIndex] = { ...this.nuevaFila };

      this.nuevaFila = {
        fecha: '',
        concepto: { nombre: '', esIngreso: false },
        cotizacion: 0,
        cantidad: 0,
        moneda: this.monedas.length > 0 ? this.monedas[0].nombre : '',
      };

      this.editIndex = null;
    }
  }

  eliminarFila(index: number) {
    this.filas.splice(index, 1);
  }

  actualizarConceptos(nuevoConcepto: Concepto) {
    this.conceptos.push(nuevoConcepto);
  }

  getUltimaFila(filas: number) {
    return this.filas.length >= filas
      ? this.filas[this.filas.length - filas]
      : null;
  }

  editarCantMonedas() {
    const ultimaFila = this.getUltimaFila(1);

    if (!ultimaFila) {
      console.warn('No hay suficientes filas para operar.');
      return;
    }

    let index = this.monedas.findIndex((m) => m.nombre === ultimaFila.moneda);
    if (index === -1) {
      alert('No existe moneda con ese nombre');
      return;
    }

    if (
      ultimaFila.concepto.nombre === 'Egreso' &&
      ultimaFila.concepto.esIngreso == false
    ) {
      this.monedas[index].cantidad -= ultimaFila.cantidad;

      const filaAnterior = this.getUltimaFila(2);
      if (!filaAnterior) {
        console.warn('No hay fila anterior para revertir.');
        return;
      }

      let indexAnterior = this.monedas.findIndex(
        (m) => m.nombre === filaAnterior.moneda
      );
      if (indexAnterior !== -1) {
        this.monedas[indexAnterior].cantidad += filaAnterior.cantidad;
      } else {
        console.warn('No existe moneda con el nombre de la fila anterior.');
      }
    } else if (
      ultimaFila.concepto.nombre === 'Ingreso' &&
      ultimaFila.concepto.esIngreso == true
    ) {
      this.monedas[index].cantidad += ultimaFila.cantidad;
      const filaAnterior = this.getUltimaFila(2);
      if (!filaAnterior) {
        console.warn('No hay fila anterior para revertir.');
        return;
      }

      let indexAnterior = this.monedas.findIndex(
        (m) => m.nombre === filaAnterior.moneda
      );
      if (indexAnterior !== -1) {
        this.monedas[indexAnterior].cantidad -= filaAnterior.cantidad;
      } else {
        console.warn('No existe moneda con el nombre de la fila anterior.');
      }
    } else if (
      ultimaFila.concepto.nombre != 'Ingreso' &&
      ultimaFila.concepto.esIngreso == true
    ) {
      this.monedas[index].cantidad += ultimaFila?.cantidad;
    } else if (
      ultimaFila.concepto.nombre != 'Egreso ' &&
      ultimaFila.concepto.esIngreso == false
    ) {
      console.log(ultimaFila);
      this.monedas[index].cantidad -= ultimaFila?.cantidad;
    }
  }

  agregarOperacion() {
    const ultimaFila = this.getUltimaFila(1);
    if (
      typeof ultimaFila?.cotizacion === 'number' &&
      !isNaN(ultimaFila.cotizacion)
    ) {
      if (
        ultimaFila?.concepto.nombre === 'Venta' &&
        ultimaFila?.moneda != 'ARS'
      ) {
        let operacion = ultimaFila.cotizacion * ultimaFila.cantidad;

        this.filas.push({
          fecha: moment().format('lll'),
          concepto: { nombre: 'Ingreso', esIngreso: true },
          cotizacion: '------',
          cantidad: operacion,
          moneda: 'ARS',
        });
      } else if (
        ultimaFila?.concepto.nombre === 'Compra' &&
        ultimaFila?.moneda != 'ARS'
      ) {
        let operacion = ultimaFila.cotizacion * ultimaFila.cantidad;

        this.filas.push({
          fecha: moment().format('lll'),
          concepto: { nombre: 'Egreso', esIngreso: false },
          cotizacion: '------',
          cantidad: operacion,
          moneda: 'ARS',
        });
      }

      this.editarCantMonedas();
    }
  }

  actualizarMonedas(monedas: Moneda[]) {
    console.log('monedas', monedas);
    this.monedas = monedas;
    if (!this.nuevaFila.moneda && monedas.length > 0) {
      this.nuevaFila.moneda = monedas[0].nombre;
    }
  }

  toggleFormMonedas() {
    this.mostrarMonedas = !this.mostrarMonedas;
  }
}
