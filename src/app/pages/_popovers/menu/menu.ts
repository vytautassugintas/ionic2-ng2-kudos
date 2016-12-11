import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthenticationService} from "../../../services/authentication.service";
import {LoginPage} from "../../login/login";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController, public authService: AuthenticationService) {}

  ionViewDidLoad() {

  }

  logout(){
    this.authService.logout().subscribe(
      success => {
        this.navCtrl.pop();
        this.navCtrl.push(LoginPage);

      },
      error => {
        this.navCtrl.pop();
        this.navCtrl.push(LoginPage);
      }
    )
  }

  close(){

  }

}
