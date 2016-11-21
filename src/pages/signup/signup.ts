import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SignUpForm} from "../../app/forms/sign-up.form";
import {LoginPage} from "../login/login";

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
