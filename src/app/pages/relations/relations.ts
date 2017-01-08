import {Component} from '@angular/core';

import {NavController, ModalController, ToastController} from 'ionic-angular';
import {HomeService} from "../../services/home.service";
import {UserModalPage} from "../_modals/user-modal/user-modal";
import {KudosModalPage} from "../_modals/kudos-modal/kudos-modal";
import {SearchUserModal} from "../_modals/search-user-modal/search-user-modal";


@Component({
  selector: 'page-relations',
  templateUrl: 'relations.html'
})
export class RelationsPage {

  emailInputFocused: boolean = false;
  showPredicates: boolean = false;
  receiverEmail: string = "";
  predicatedEmails = [];
  followingList: any;
  followingCount: number = 0;
  followersList: any;
  followersCount: number = 0;
  segment: string = "following";

  shouldShowCancel: boolean = false;
  searchEmail: string = '';

  constructor(public navCtrl: NavController, public homeService: HomeService, public modalCtrl: ModalController, public toastCtrl: ToastController) {

  }

  ionViewWillEnter() {
    this.homeService.getFollowing(0, 20).subscribe(
      following => {
        this.followingList = following.content;
        this.followingCount = following.totalElements;
      });
    this.homeService.getFollowers(0, 20).subscribe(
      followers => {
        this.followersList = followers.content;
        this.followersCount = followers.totalElements;
      }
    );
  }

  loadPredicates(name) {
    this.homeService.getEmailPredicates(name).subscribe(
      emails => {
        this.predicatedEmails = emails;
      }
    )
  }

  onInput(event) {
    this.showPredicates = this.searchEmail.length > 2;
    if (this.showPredicates) {
      this.loadPredicates(this.searchEmail);
    }
  }

  openUserModal(id) {
    this.modalCtrl.create(UserModalPage, {userId: id}).present();
  }

  openKudosModal(email) {
    let modal = this.modalCtrl.create(KudosModalPage, {email: email});
    /*modal.onDidDismiss(data => {
     if (data) {
     this.increaseUserExperiencePoints(data * 2);
     this.user.weeklyKudos -= data;
     }
     });*/
    modal.present();
  }

  openSearchUserModal() {
    let modal = this.modalCtrl.create(SearchUserModal);
    modal.present();
  }

  unfollow(id, fullName, index) {
    console.log(index);
    this.homeService.unfollow(id).subscribe(
      success => {
        this.presentToast("Unfollowed " + fullName);
        this.followingList.splice(index, 1);
      }
    )
  }

  onClear(event) {
    this.searchEmail = '';
    this.showPredicates = false;
    this.predicatedEmails = [];
  }

  presentToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

}
