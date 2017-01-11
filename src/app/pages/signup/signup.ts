import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {SignUpForm} from "../../forms/sign-up.form";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signUpForm = new SignUpForm('', '', '', '', '');
  error: {};

  constructor(public navCtrl: NavController, public authService: AuthenticationService, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  register(){
    this.authService.register(this.signUpForm.email, this.signUpForm.firstName + " " + this.signUpForm.lastName, this.signUpForm.password).subscribe(
      response => {
        this.redirectToLogin();
        this.presentToast("Registered! You can login now")
      },
      error => {
        error = this.error = error;
      }
    )
  }

  presentToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

  redirectToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
