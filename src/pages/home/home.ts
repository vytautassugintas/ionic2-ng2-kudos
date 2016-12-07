import {Component} from '@angular/core';

import {NavController, ToastController, ModalController} from 'ionic-angular';
import {HomeService} from "../../app/services/home.service";
import {AuthenticationService} from "../../app/services/authentication.service";
import {KudosForm} from "../../app/forms/kudos.form";
import {KudosService} from "../../app/services/kudos.service";
import {KudosModalPage} from "../_modals/kudos-modal/kudos-modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user: any = {};

  experiencePointsPercentage = 0;

  showMessageCharactersCounter = false;

  constructor(public navCtrl: NavController, private homeService: HomeService, private authService: AuthenticationService, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.getUserInformation();
  }

  getUserInformation() {
    this.homeService.home().subscribe(
      user => {
        this.user = user;
        this.calculateExperiencePointsPercentage(user.experiencePoints, user.experiencePointsToLevelUp, user.previousLevelExperiencePoints);
      }
    )
  }

  calculateExperiencePointsPercentage(number, amount, previous) {
    let percentage = (number - previous) / (amount - previous) * 100;
    if (percentage <= 100) {
      this.experiencePointsPercentage = (number - previous) / (amount - previous) * 100;
    } else {
      this.experiencePointsPercentage = 100;
    }
  }

  increaseUserExperiencePoints(experiencePoints) {
    this.user.experiencePoints += experiencePoints;
    this.calculateExperiencePointsPercentage(this.user.experiencePoints, this.user.experiencePointsToLevelUp, this.user.previousLevelExperiencePoints);
    if (this.user.experiencePoints >= this.user.experiencePointsToLevelUp) {
      setTimeout(() => {
        this.experiencePointsPercentage = 0;
        this.getUserInformation();
      }, 800);
    }
  }

  openKudosModal() {
    let modal = this.modalCtrl.create(KudosModalPage, {user: this.user});
    modal.onDidDismiss(data => {
      if (data){
        this.increaseUserExperiencePoints(data * 2);
        this.user.weeklyKudos -= data;
      }
    });

    modal.present();
  }

}
