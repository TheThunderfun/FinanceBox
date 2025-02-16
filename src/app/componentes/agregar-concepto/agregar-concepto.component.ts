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

  esGasto: boolean = false;

  guardarConcepto() {
    if (!this.nuevoConcepto.nombre || this.nuevoConcepto.nombre.trim() === '') {
      alert('Debe ingresar un nombre válido');
      return;
    }

    if (
      this.listaConceptos.some(
        (concepto) =>
          concepto.nombre.toLowerCase() ===
          this.nuevoConcepto.nombre.toLowerCase()
      )
    ) {
      console.log(this.listaConceptos);
      alert('Ya existe un concepto con este nombre');
      return;
    }

    if (this.esGasto) {
      this.nuevoConcepto.esIngreso = false;
      this.conceptoAgregado.emit(this.nuevoConcepto);
      alert('Concepto Agregado con exito');
    } else {
      this.nuevoConcepto.esIngreso = true;
      this.conceptoAgregado.emit(this.nuevoConcepto);
      alert('Concepto Agregado con exito');
    }
  }
  Salir() {
    this.cerrarFormulario.emit();
  }
}
