import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubcription: Subscription;
  ingresosEgresosSubcription: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubcription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null )
      )
      .subscribe(({ user }) => {
        this.ingresosEgresosSubcription = this.ingresoEgresoService.initIngresoEgresosListener(user.uid)
          .subscribe((ingresosEgresos) => {
            this.store.dispatch(ingresoEgresoActions.setItems({ items: ingresosEgresos }));
          });
      });
  }

  ngOnDestroy(): void {
    this.userSubcription.unsubscribe();
    this.ingresosEgresosSubcription.unsubscribe();
  }

}
