import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styles: [],
})
export class UsersDialogComponent {
  // Formulario para la entrada de datos del usuario
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<UsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user?: User // Datos del usuario a editar, si se proporcionan
  ) {
    // Inicialización del formulario con validadores
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    // Si existe un usuario, rellenar el formulario con sus datos
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  // Función para enviar el formulario al hacer clic en el botón de enviar
  onSubmit(): void {
    // Validar el formulario y marcar todos los campos como tocados si es inválido
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      // Cerrar el diálogo y pasar los datos del formulario
      this.matDialogRef.close(this.userForm.value);
    }
  }
}
