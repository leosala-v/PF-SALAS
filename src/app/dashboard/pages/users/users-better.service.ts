import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable()
export class UsersBetterService {
  constructor(private usersService: UsersService) {}

  getUsersWithProduct(): any {
    const users = this.usersService.getUsers();
    const products = [
      {
        id: 2,
        name: 'fgshdjv"',
      },
    ];
    return {
      users,
      products,
    };
  }
}
