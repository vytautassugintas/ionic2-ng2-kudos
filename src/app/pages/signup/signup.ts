import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {SignUpForm} from "../../forms/sign-up.form";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signUpForm = new SignUpForm('', '', '', '', '');

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('Hello SignupPage Page');
  }

  redirectToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
