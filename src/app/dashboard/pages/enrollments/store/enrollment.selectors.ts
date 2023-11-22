import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollment from './enrollment.reducer';

export const selectEnrollmentState = createFeatureSelector<fromEnrollment.State>(
  fromEnrollment.enrollmentFeatureKey
);

// Crea un selector para extraer todas las propiedades del estado de matrícula
const selectEnrollmentFeature = createSelector(
  selectEnrollmentState,
  (state) => ({
    enrollments: state.enrollments, // Lista de matrículas
    isLoading: state.isLoading, // Estado de carga general
    courseOptions: state.courseOptions, // Opciones de cursos
    studentOptions: state.studentOptions, // Opciones de estudiantes
    isLoadingDialogOptions: state.isLoadingDialogOptions, // Estado de carga de opciones de dialog
  })
);

// Selector para obtener la lista de matrículas
export const selectEnrollments = createSelector(
  selectEnrollmentFeature,
  (state) => state.enrollments
);

// Selector para obtener el estado de carga general
export const selectEnrollmentsIsLoading = createSelector(
  selectEnrollmentFeature,
  (state) => state.isLoading
);

// Selector para obtener las opciones de cursos
export const selectCourseOptions = createSelector(
  selectEnrollmentFeature,
  (state) => state.courseOptions
);

// Selector para obtener las opciones de estudiantes
export const selectStudentOptions = createSelector(
  selectEnrollmentFeature,
  (state) => state.studentOptions
);

// Selector para obtener el estado de carga de opciones de dialo
export const selectIsLoadingDialogOptions = createSelector(
  selectEnrollmentFeature,
  (state) => state.isLoadingDialogOptions
);
