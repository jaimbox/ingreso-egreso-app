import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-stadistica',
  templateUrl: './stadistica.component.html',
  styleUrls: ['./stadistica.component.css']
})
export class StadisticaComponent implements OnInit, OnDestroy {
  ingresos = 0;
  egresos = 0;
  totalIngresos = 0;
  totalEgresos = 0;

  ingresosSubscription: Subscription;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingresosSubscription = this.store.select('ingresosEgresos')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  ngOnDestroy(): void {
    this.ingresosSubscription.unsubscribe();
  }

  private generarEstadistica(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;

    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos ++;
      } else if (item.tipo === 'egreso') {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }
}
