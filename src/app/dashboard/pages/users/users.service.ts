import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { switchMap } from 'rxjs/operators';
import { User } from './models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  // Obtiene la lista de usuarios desde el servidor
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.baseUrl}/users`);
  }

  // Crea un nuevo usuario y actualiza la lista después
  createUser(payload: User): Observable<User[]> {
    return this.httpClient.post<User>(`${environment.baseUrl}/users`, payload).pipe(
      switchMap(() => this.getUsers()) // Actualiza la lista después de crear un usuario
    );
  }

  // Actualiza un usuario existente y actualiza la lista después
  updateUser(userId: number, payload: User): Observable<User[]> {
    return this.httpClient.put<User>(`${environment.baseUrl}/users/${userId}`, payload).pipe(
      switchMap(() => this.getUsers()) // Actualiza la lista después de actualizar un usuario
    );
  }

  // Elimina un usuario y actualiza la lista después
  deleteUser(id: number): Observable<User[]> {
    return this.httpClient.delete<Object>(`${environment.baseUrl}/users/${id}`).pipe(
      switchMap(() => this.getUsers()) // Actualiza la lista después de eliminar un usuario
    );
  }
}
