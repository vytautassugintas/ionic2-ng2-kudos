import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {LeaderboardService} from "../../services/leaderboard.service";
import {UserModalPage} from "../_modals/user-modal/user-modal";
import {EndorsementsModalPage} from "../_modals/endorsements-modal/endorsements-modal";
import {SearchUserModal} from "../_modals/search-user-modal/search-user-modal";

@Component({
  selector: 'page-leaders',
  templateUrl: 'leaders.html'
})
export class LeadersPage {

  segment: string = "receivers";
  selectedEndorsement: string;

  periodInDays: string = '';

  receiversList = [];
  sendersList = [];
  endorsedLeadersList = [];

  showLoader: boolean = false;

  constructor(public navCtrl: NavController, public leaderService: LeaderboardService, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.getReceivers();
    this.getSenders();
  }

  getReceivers() {
    this.leaderService.getTopReceivers(this.periodInDays).subscribe(
      leaders => this.receiversList = leaders
    )
  }

  getSenders() {
    this.leaderService.getTopSenders(this.periodInDays).subscribe(
      leaders => this.sendersList = leaders
    )
  }

  openUserModal(userId) {
    this.modalCtrl.create(UserModalPage, {userId: userId}).present();
  }

  openSearchUserModal() {
    let modal = this.modalCtrl.create(SearchUserModal);
    modal.present();
  }

  presentEndorsementsModal() {
    let modal = this.modalCtrl.create(EndorsementsModalPage);
    modal.onDidDismiss(data => {
      this.showLoader = true;
      if (data) {
        this.selectedEndorsement = data;
        this.leaderService.getTopByEndorsement(this.periodInDays, this.selectedEndorsement).subscribe(
          leaders => {
            this.endorsedLeadersList = leaders;
            this.showLoader = false;
          }
        )
      } else {
        this.showLoader = false;
      }
    });
    modal.present();
  }

  checkPlace(index) {
    switch (index) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'st';
    }
  }

}
