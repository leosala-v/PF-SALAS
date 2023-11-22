import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { Observable } from 'rxjs';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]> | undefined; 
  constructor(
    private coursesService: CoursesService, 
    private matDialog: MatDialog 
  ) {
    this.loadCourses();
  }

  // Función para cargar los cursos desde el servicio
  loadCourses(): void {
    this.courses$ = this.coursesService.getCourses$();
  }

  // Función para agregar un curso usando un diálogo
  addCourse(): void {
    this.openDialog().subscribe((result) => {
      if (result) {
        // Crear un curso y cargar los cursos actualizados después de la operación
        this.coursesService
          .createCourse$({
            id: new Date().getTime(),
            name: result.name,
            endDate: result.endDate,
            startDate: result.startDate,
          })
          .subscribe(() => this.loadCourses());
      }
    });
  }

  // Función para eliminar un curso y cargar los cursos actualizados
  onDeleteCourse(courseId: number): void {
    this.coursesService.deleteCourse$(courseId).subscribe(() => this.loadCourses());
  }

  // Función para editar un curso usando un diálogo y cargar los cursos actualizados
  onEditCourse(courseId: number): void {
    this.openDialog(courseId).subscribe((result) => {
      if (result) {
        this.coursesService.editCourse$(courseId, result).subscribe(() => this.loadCourses());
      }
    });
  }

  // Función para abrir el diálogo para agregar/editar cursos
  private openDialog(courseId?: number): Observable<any> {
    return this.matDialog.open(CoursesDialogComponent, { data: courseId }).afterClosed();
  }
}
