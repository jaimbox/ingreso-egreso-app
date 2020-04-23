import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre = '';
  userSubs: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter(({ user }) => user != null)
      )
      .subscribe(({ user }) => this.nombre = user.nombre);
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logout() {
    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.logout().then(() => {
      Swal.close();
      this.router.navigate(['/login']);
    });
  }
}
