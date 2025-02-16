import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
export interface Concepto {
  nombre: string;
  esIngreso: boolean;
}

@Component({
  selector: 'app-agregar-concepto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-concepto.component.html',
  styleUrl: './agregar-concepto.component.css',
})
export class AgregarConceptoComponent {
  @Input() listaConceptos: Concepto[] = [];
  @Output() conceptoAgregado = new EventEmitter<Concepto>();
  @Output() cerrarFormulario = new EventEmitter<void>();

  nuevoConcepto: Concepto = { nombre: '', esIngreso: false };

  agregarMoneda: boolean = false;
  esGasto: boolean = false;

  guardarConcepto() {
    if (this.agregarMoneda != null) {
      if (this.esGasto) this.nuevoConcepto.esIngreso = false;
      this.conceptoAgregado.emit(this.nuevoConcepto);
    } else {
      this.conceptoAgregado.emit(this.nuevoConcepto);
    }
    this.cerrarFormulario.emit();
  }
}
