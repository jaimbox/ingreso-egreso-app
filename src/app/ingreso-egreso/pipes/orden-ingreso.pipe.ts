import { Pipe, PipeTransform } from '@angular/core';

import { IngresoEgreso } from '../../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[], ...args: unknown[]): IngresoEgreso[] {
    return items.slice().sort(({ tipo }) => {
      if (tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
