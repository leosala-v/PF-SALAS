import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { map } from 'rxjs/operators';
import { User } from '../../pages/users/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public authUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }

  // Función que devuelve el nombre completo del usuario.
  get fullName$(): Observable<string> {
    return this.getUserProperty$((user) => `${user?.name} ${user?.lastName}`);
  }

  // Función que devuelve el email del usuario.
  get email$(): Observable<string | undefined> {
    return this.getUserProperty$((user) => user?.email);
  }

  // Función genérica para obtener una propiedad del usuario.
  private getUserProperty$<T>(mapper: (user: User | null) => T): Observable<T> {
    return this.authUser$.pipe(map((user) => mapper(user)));
  }

  // Método para cerrar sesión.
  logout(): void {
    this.authService.logout();
  }
}
