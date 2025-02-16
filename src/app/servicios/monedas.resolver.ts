import { ResolveFn } from '@angular/router';
import { MonedaService } from '../servicios/moneda.service';
import { Moneda } from '../componentes/monedas/monedas.component';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

export const monedasResolver: ResolveFn<Moneda[]> = () => {
  const monedaService = inject(MonedaService);
  return monedaService.monedas$;
};
