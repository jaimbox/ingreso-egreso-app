import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import {Subscription} from 'rxjs';
import {unSetItems} from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription;
  private _user: Usuario;

  get user() {
    return {... this._user};
  }

  constructor(private auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe((fbUser) => {
      if (fbUser) {
        this.userSubscription = this.firestore.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((fsUser: any) => {
            const user = Usuario.fromFirebase(fsUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(unSetItems());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user}) => {
        const newuser = new Usuario(user.uid, nombre, user.email);

        return this.firestore.doc(`${user.uid}/usuario`).set({...newuser});
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null)
    );
  }
}
