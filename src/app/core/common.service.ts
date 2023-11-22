import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  obtenerUsuariosAsync(): import("../dashboard/pages/users/models").User[] | PromiseLike<import("../dashboard/pages/users/models").User[]> {
    throw new Error('Method not implemented.');
  }
  constructor() {
    console.log('CommonService');
  }
}
