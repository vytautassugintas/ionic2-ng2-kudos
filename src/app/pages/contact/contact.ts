import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {HomeService} from "../../services/home.service";


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  emailInputFocused: boolean = false;
  showPredicates: boolean = false;
  receiverEmail: string = "";
  predicatedEmails = [];

  constructor(public navCtrl: NavController, public homeService: HomeService) {

  }

  loadPredicates(name) {
    this.homeService.getEmailPredicates(name).subscribe(
      emails => {
        this.predicatedEmails = emails;
      }
    )
  }

  onEmailInputChange(email) {
    this.showPredicates = email.length > 2;
    if (this.showPredicates) {
      this.loadPredicates(email);
    }
  }

  onEmailFocus() {
    this.emailInputFocused = true;
  }

  onEmailBlur() {
    setTimeout(() => {
      this.emailInputFocused = false
    }, 30)
  }

  selectPredicate(email) {
    this.receiverEmail = email;
    this.showPredicates = false;
  }

}
