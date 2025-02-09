import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-concepto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-concepto.component.html',
  styleUrl: './agregar-concepto.component.css',
})
export class AgregarConceptoComponent {
  @Input() listaConceptos: string[] = [];
  @Output() conceptoAgregado = new EventEmitter<string>();
  @Output() cerrarFormulario = new EventEmitter<void>();

  nuevoConcepto: string = '';
  moneda: { nombre: string; valor: number } = { nombre: '', valor: 0 };
  agregarMoneda: boolean = false;

  guardarConcepto() {
    console.log('Venta de ' + this.moneda.nombre);
    console.log('valor:' + this.agregarMoneda.valueOf());
    if (this.agregarMoneda) {
      this.conceptoAgregado.emit('Venta de ' + this.moneda.nombre);
      this.conceptoAgregado.emit('Compra de ' + this.moneda.nombre);
    } else {
      this.conceptoAgregado.emit(this.nuevoConcepto);
    }

    this.nuevoConcepto = '';
    this.moneda = { nombre: '', valor: 0 };
    this.agregarMoneda = false;
    // this.cerrarFormulario.emit();
  }
}
