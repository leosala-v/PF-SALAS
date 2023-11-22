import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enrollment, User } from '../../models';
import { selectEnrollments, selectEnrollmentsIsLoading } from '../../store/enrollment.selectors';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { EnrollmentActions } from '../../store/enrollment.actions';

@Component({
  selector: 'app-enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.scss'],
})
export class EnrollmentsTableComponent implements OnInit {
  displayedColumns = ['id', 'course', 'user', 'actions'];
  enrollments$: Observable<Enrollment[]>; // Observable para las inscripciones
  isLoading$: Observable<boolean>; // Observable para indicar si está cargando

  constructor(private store: Store, private httpClient: HttpClient) {
    this.enrollments$ = this.store.select(selectEnrollments); // Obtener inscripciones del Store
    this.isLoading$ = this.store.select(selectEnrollmentsIsLoading); // Obtener estado de carga del Store
  }

  ngOnInit(): void {
    // Se puede realizar la inicialización si es necesaria al cargar el componente
  }

  // Método para eliminar usuario
  deleteUser(userId: number): void {
    // Confirmación para eliminar usuario
    const confirmDelete = confirm('¿Estás seguro de eliminar este usuario?');
    
    if (confirmDelete) {
      // Se realiza la petición DELETE al servidor
      this.httpClient.delete<User[]>(`${environment.baseUrl}/users/${userId}`)
        .subscribe(
          () => {
            console.log('Usuario eliminado con éxito');
            // Después de eliminar, se actualiza la lista de inscripciones en el Store
            this.store.dispatch(EnrollmentActions.loadEnrollments());
          },
          (error) => {
            console.error('Error al eliminar usuario', error);
          }
        );
    }
  }
}
