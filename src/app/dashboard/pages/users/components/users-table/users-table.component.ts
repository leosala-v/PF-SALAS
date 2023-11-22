import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User, UserRole } from '../../models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styles: [],
})
export class UsersTableComponent {
  // Datos de entrada para la tabla de usuarios
  @Input()
  dataSource: User[] = [];

  // Eventos de salida para eliminar y editar usuarios
  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<User>();

  // Columnas a mostrar en la tabla
  displayedColumns = ['id', 'fullname', 'email', 'actions'];

  // Observable que contiene el rol del usuario autenticado
  userRole$: Observable<UserRole | undefined>;

  constructor(private router: Router, private store: Store) {
    // Obtiene el rol del usuario autenticado del almacenamiento global
    this.userRole$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role));
  }
}
