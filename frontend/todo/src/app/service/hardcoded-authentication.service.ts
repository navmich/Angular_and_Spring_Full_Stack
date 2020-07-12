import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAuthenticationService {
  constructor() {}

  authenticate(username, password) {
    if (username === 'Mike' && password === 'p') {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    return sessionStorage.getItem('authenticatedUser') !== null;
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
  }
}
