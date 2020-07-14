import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  WelcomeDataService,
  HelloWorldBean,
} from '../service/data/welcome-data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  name: string;
  welcomeMessageFromService: string;
  test: string;

  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
    this.service
      .executeHelloWorlBeanService()
      .subscribe((response) => this.handleSuccesfulResponse(response));
  }

  handleSuccesfulResponse(response: HelloWorldBean) {
    this.welcomeMessageFromService = response.message;
  }
}
