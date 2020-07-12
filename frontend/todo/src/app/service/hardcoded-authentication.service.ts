import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAuthenticationService {
  constructor() {}

  authenticate(username, password) {
    if (username === 'Mike' && password === 'p') {
      return true;
    }
    return false;
  }
}
