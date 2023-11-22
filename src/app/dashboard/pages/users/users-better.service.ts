import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersBetterService {
  constructor(private usersService: UsersService) {}

  /**
   * Obtiene usuarios y productos de manera conjunta.
   * @returns Observable con datos de usuarios y productos combinados.
   */
  getUsersWithProduct(): Observable<any> {
    const users$ = this.usersService.getUsers();
    const products = [ // Simulación de datos de productos
      {
        id: 2,
        name: 'fgshdjv"',
      },
    ];

    // Combinar la solicitud de usuarios con los datos de productos
    return forkJoin({
      users: users$, // Observable de usuarios
      products: products, // Array de productos simulados
    }).pipe(
      map((data: { users: any, products: any }) => {
        return {
          users: data.users,
          products: data.products,
        };
      })
    );
  }
}
