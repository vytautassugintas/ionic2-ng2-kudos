import {Component} from '@angular/core';

import {NavController, ModalController, PopoverController} from 'ionic-angular';
import {KudosModalPage} from "../_modals/kudos-modal/kudos-modal";
import {HomeService} from "../../services/home.service";
import {MenuPage} from "../_popovers/menu/menu";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user: any = {};
  actionsList: any = [];
  experiencePointsPercentage = 0;
  page: number = 0;
  lastPage: boolean = false;

  constructor(public navCtrl: NavController, private homeService: HomeService, public modalCtrl: ModalController, public popoverCtrl: PopoverController) {

  }

  ionViewDidLoad() {
    this.getUserInformation();
    this.getGlobalActions(this.page, 10);
  }

  getUserInformation() {
    this.homeService.home().subscribe(
      user => {
        this.user = user;
        this.calculateExperiencePointsPercentage(user.experiencePoints, user.experiencePointsToLevelUp, user.previousLevelExperiencePoints);
      }
    )
  }

  getGlobalActions(page, pageSize) {
    this.homeService.globalActions(page, pageSize).subscribe(
      result => {
        this.page++;
        for (var item of result.content) {
          this.actionsList.push(item);
        }
        if (result.last) {
          this.lastPage = true;
        }
      }
    )
  }

  doInfinite(infiniteScroll) {
    if (this.lastPage) {
      infiniteScroll.enable(false);
    } else {
      this.homeService.globalActions(this.page, 10).subscribe(
        result => {
          this.page++;
          for (var item of result.content) {
            this.actionsList.push(item);
          }
          infiniteScroll.complete();

          if (result.last) {
            this.lastPage = true;
            infiniteScroll.enable(false);
          }

        })
    }
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
      if (data) {
        this.increaseUserExperiencePoints(data * 2);
        this.user.weeklyKudos -= data;
      }
    });

    modal.present();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MenuPage);
    popover.present({
      ev: myEvent
    });
  }

}
