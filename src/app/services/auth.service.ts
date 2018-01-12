import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthService {

  constructor() { }

  // Just a static mock of login that returns an observable
  login(username: string, password: string) {
    let user: any = {};

    if (username == 'admin' && password == 'admin') {
      user.username = username;
      user.password = password;
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      user = null;
    }

    return of(user);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
