import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {HomeService} from "../../app/services/home.service";
import {AuthenticationService} from "../../app/services/authentication.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {};

  constructor(public navCtrl: NavController, private homeService: HomeService, private authService: AuthenticationService) {

  }

  ionViewDidLoad() {
    this.getUserInformation();
  }

  getUserInformation(){
    this.homeService.home().subscribe(
      user => this.user = user
    )
  }

}
