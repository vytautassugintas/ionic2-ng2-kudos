import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {SignupPage} from "../signup/signup";
import {LoginForm} from "../../forms/login.form";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: LoginForm;
  error: {};

  constructor(public navCtrl: NavController, private authService: AuthenticationService, public alertCtrl: AlertController) {
    this.loginForm = new LoginForm("", "");
  }

  ionViewDidLoad() {
    this.authService.isLogged().subscribe(
      isLogged => {
        if (isLogged) {
          this.navCtrl.push(TabsPage);
        }
      }
    )
  }

  submitLogin() {
    this.authService.login(this.loginForm.userEmail, this.loginForm.password).subscribe(
      response => {
        this.navCtrl.push(TabsPage);
      },
      error => {
        this.error = error.fieldError;
      }
    );
  }

  redirectToSignUp() {
    this.navCtrl.push(SignupPage);
  }

}
