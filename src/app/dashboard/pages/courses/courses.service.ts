import { Injectable } from '@angular/core';
import { Course } from './models';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  courses: Course[] = [ 
    {
    id: 1,
    name: 'Anatomia',
    endDate: new Date(),
    startDate: new Date(),
  },
  {
    id: 2,
    name: 'Bioseguridad',
    endDate: new Date(),
    startDate: new Date(),
  },
  {
    id: 3,
    name: 'Biología',
    endDate: new Date(),
    startDate: new Date(),
  },
  {
    id: 4,
    name: 'Hemotranfución',
    endDate: new Date(),
    startDate: new Date(),
  },
  {
    id: 5,
    name: 'Etica Profecional',
    endDate: new Date(),
    startDate: new Date(),
  },
  {
    id: 6,
    name: 'Gestion en Servicios de Hemoterapia',
    endDate: new Date(),
    startDate: new Date(),
  },
  ];

  getCourses$(): Observable<Course[]> {
    return of(this.courses);
  }

  createCourse$(payload: Course): Observable<Course[]> {
    this.courses.push(payload);
    return of([...this.courses]);
  }

  editCourse$(id: number, payload: Course): Observable<Course[]> {
    this.courses = this.courses.map((c) => (c.id === id ? { ...c, ...payload } : c));
    return of([...this.courses]);
  }

  deleteCourse$(id: number): Observable<Course[]> {
    this.courses = this.courses.filter((c) => c.id !== id);
    return of([...this.courses]);
  }

  getCourseById$(id: number): Observable<Course | undefined> {
    return of(this.courses.find((c) => c.id === id));
  }
}
