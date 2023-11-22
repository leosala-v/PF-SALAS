import { Component, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  loading = false; 
  clockSubscription: Subscription | undefined; 
  constructor() {
    // Simulación de carga de usuarios después de 3 segundos
    this.loading = true; // Estado de carga iniciado
    setTimeout(() => {
      this.loading = false; // Estado de carga finalizado
      console.log('Se cargó todo correctamente'); // Mensaje de carga completada
    }, 3000);

    this.startClock(); // Iniciar el reloj al inicio del componente
  }
  ngOnDestroy(): void {
    // Desechar la suscripción al destruir el componente
    this.clockSubscription?.unsubscribe();
  }

  startClock(): void {
    // Lógica para el reloj que emite valores cada segundo durante 10 segundos
    this.clockSubscription = timer(0, 1000) // Emite valores cada segundo
      .pipe(take(10)) // Emite solo 10 valores y completa
      .subscribe({
        next: (v) => console.log('loading...', v + 1, 'seg.'), // Muestra el número del tick
        error: () => {
          alert('Ocurrió un error en el reloj'); // Muestra una alerta en caso de error
        },
        complete: () => console.log('Pagina cargada con exito!'), // Indica la finalización del reloj
      });
  }
}
