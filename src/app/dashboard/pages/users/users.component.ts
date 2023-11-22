import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  userName = '';

  users$: Observable<User[]>;

  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService 
  ) {
    // Obtener la lista de usuarios al iniciar el componente
    this.users$ = this.usersService.getUsers();
  }

  // Abrir diálogo para agregar un nuevo usuario
  addUser(): void {
    this.matDialog
      .open(UsersDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          // Si se devuelve un valor válido desde el diálogo, crear un usuario y actualizar la lista
          if (!!v) {
            this.users$ = this.usersService.createUser(v);
          }
        }
      });
  }

  // Abrir diálogo para editar un usuario existente
  onEditUser(user: User): void {
    this.matDialog
      .open(UsersDialogComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          // Si se devuelve un valor válido desde el diálogo, actualizar el usuario y la lista
          if (!!v) {
            this.users$ = this.usersService.updateUser(user.id, v);
          }
        }
      });
  }

  // Eliminar un usuario después de la confirmación del usuario
  onDeleteUser(userId: number): void {
    if (confirm('¿Está seguro?')) {
      this.users$ = this.usersService.deleteUser(userId);
    }
  }
}
