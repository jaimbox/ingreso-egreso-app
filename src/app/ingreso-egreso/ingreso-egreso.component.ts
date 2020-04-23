import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as uiActions from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  tipo = 'ingreso';
  cargando = false;
  loadingSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit(): void {

    this.loadingSubscription = this.store.select('ui')
      .subscribe(({ isLoading }) => this.cargando = isLoading);

    this.ingresoForm = this.fb.group({
      description: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  guardar() {
    this.store.dispatch(uiActions.isLoading());

    if (this.ingresoForm.invalid) { return; }

    const { description, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(description, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then((ref) => {
        this.ingresoForm.reset();
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire('Registro creado', description, 'success');
      })
      .catch((err) => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire('Registro creado', err.message, 'error');
      });
  }
}
