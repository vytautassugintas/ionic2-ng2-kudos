import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginForm} from "../../app/forms/loginForm";
import {AuthenticationService} from "../../app/services/authentication.service";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: LoginForm;

  constructor(public navCtrl: NavController, private authService: AuthenticationService) {
    this.loginForm = new LoginForm("", "");
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  submitLogin(){
    console.log('Submit Login');
    console.log(this.loginForm);
    this.authService.login(this.loginForm.userEmail, this.loginForm.password).subscribe(
      response => {
        console.log(response);
        console.log("Calling");
        this.navCtrl.push(HomePage);
      },
      error => {
        console.log("Error");
      }
    );
  }

}
