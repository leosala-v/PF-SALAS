import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enrollment, User } from '../../models';
import { selectEnrollments, selectEnrollmentsIsLoading } from '../../store/enrollment.selectors';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.local';

@Component({
  selector: 'app-enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.scss'],
})
export class EnrollmentsTableComponent implements OnInit {
  displayedColumns = ['id', 'course', 'user', 'actions'];
  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  usersInMemory: User[] = [];

  constructor(private store: Store, private httpClient: HttpClient) {
    this.enrollments$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectEnrollmentsIsLoading);
  }
  ngOnInit(): void {
    this.getUsers().subscribe((users) => {
      this.usersInMemory = users;
    });
  }
  deleteUser(userId: number): void {
    const confirmDelete = confirm('¿Estás seguro de eliminar este usuario?');
    if (confirmDelete) {
      this.httpClient.delete<User[]>(`${environment.baseUrl}/users/${userId}`)
        .pipe(concatMap(() => this.getUsers()))
        .subscribe(
          (users: User[]) => {
            this.usersInMemory = users;
            console.log('Usuario eliminado con éxito', users);
          },
          (error) => {
            console.error('Error al eliminar usuario', error);
          }
        );
    }
  }
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.baseUrl}/users`);
  }
  saveChangesInMemory(): void {  }
}
