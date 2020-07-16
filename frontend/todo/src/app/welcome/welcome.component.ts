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
  welcomeErrorMessageFromService: string;

  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
    this.service.executeHelloWorlBeanService().subscribe(
      (response) => this.handleSuccesfulResponse(response),
      (error) => this.handleErrorResponse(error)
    );
  }

  getWelcomeMessageWithName() {
    this.service.executeHelloWorldBeanWithPathVariable(this.name).subscribe(
      (response) => this.handleSuccesfulResponse(response),
      (error) => this.handleErrorResponse(error)
    );
  }

  handleSuccesfulResponse(response: HelloWorldBean) {
    this.welcomeMessageFromService = response.message;
  }

  handleErrorResponse(error: any) {
    this.welcomeErrorMessageFromService = error.error.message;
  }
}
