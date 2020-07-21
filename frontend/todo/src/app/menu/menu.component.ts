import { Component, OnInit, Injector } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  hardcodedAuthService: HardcodedAuthenticationService;

  constructor(injector: Injector) {
    this.hardcodedAuthService = injector.get(HardcodedAuthenticationService);
  }

  ngOnInit() {}
}
