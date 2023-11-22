import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from '../../courses.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'],
})
export class CoursesDialogComponent {
  nameControl = new FormControl();
  startDateControl = new FormControl();
  endDateControl = new FormControl();

  courseForm = new FormGroup({
    name: this.nameControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl,
  });

  constructor(
    private matDialogRef: MatDialogRef<CoursesDialogComponent>,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) private courseId?: number
  ) {
    // Si se proporciona un courseId, carga los detalles del curso.
    if (courseId) {
      this.loadCourse(courseId);
    }
  }

  // Carga los detalles del curso si se está editando.
  private loadCourse(courseId: number): void {
    this.coursesService.getCourseById$(courseId)
      .pipe(take(1)) // Toma solo la primera emisión del observable.
      .subscribe((course) => {
        if (course) {
          // Rellena el formulario con los datos del curso.
          this.courseForm.patchValue(course);
        }
      });
  }
  public get isEditing(): boolean {
    return !!this.courseId;
  }
  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.courseForm.value);
    }
  }
}
