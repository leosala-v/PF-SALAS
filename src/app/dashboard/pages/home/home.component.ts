import { Component, OnDestroy } from '@angular/core';
import { User } from '../users/models';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  loading = false;

  clockSuscription: Subscription;

  constructor() {
    this.getUsers();

    this.clockSuscription = this.getClock().subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (err) => {
        alert('Ocurrio un error!');
      },
      complete: () => {
        console.log('...');
      },
    });
    this.getClock().subscribe({
      next: (v) => {
        console.log('...');
      },
    });
  }
  ngOnDestroy(): void {
    console.log('...');

    this.clockSuscription.unsubscribe();
  }
  getClock(): Observable<number> {
    return new Observable((suscriber) => {
      let counter = 0;

      setInterval(() => {
        counter++;
        suscriber.next(counter);

        if (counter === 10) {
          suscriber.complete();
        }
      }, 0);
    });
  }
  async getUsers(): Promise<void> {
    this.loading = true;
    const getUsersPromise = new Promise((resolve, reject) => {
      const users: User[] = [];
      setTimeout(() => {
        resolve(users);
      }, 3000);
    });
    await getUsersPromise
      .then((result) => console.log(result))
      .catch((err) => {
        alert('Ocurrio un error inesperado'), console.log(err);
      })
      .finally(() => {
        this.loading = false;
      });
    console.log('Se cargo todo oK');
  }
}
