import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {HomeService} from "../../../services/home.service";
import {KudosService} from "../../../services/kudos.service";


@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html'
})
export class UserModalPage {

  userId: string;
  userProfile: any = {};
  kudosHistoryList = [];

  page: number = 0;
  lastPage: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public viewController: ViewController, public homeService: HomeService, public kudosService: KudosService) {
    this.userId = params.get("userId");
  }

  ionViewDidLoad() {
    this.loadUserProfile(this.userId);
    this.getKudosHistory(this.page, 10);
  }

  loadUserProfile(id) {
    this.homeService.userProfile(id).subscribe(
      profile => this.userProfile = profile,
      error => console.log(error)
    )
  }

  loadUserKudosHistory(id) {

  }

  getUserFullName() {
    return this.userProfile.firstName + ' ' + this.userProfile.lastName;
  }


  getKudosHistory(page, pageSize) {
    this.kudosService.getUserHistory(this.userId, page, pageSize).subscribe(
      result => {
        this.page++;
        for (var item of result.content) {
          this.kudosHistoryList.push(item);
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
      this.kudosService.getUserHistory(this.userId, this.page, 10).subscribe(
        result => {
          this.page++;
          for (var item of result.content) {
            this.kudosHistoryList.push(item);
          }
          infiniteScroll.complete();

          if (result.last) {
            this.lastPage = true;
            infiniteScroll.enable(false);
          }

        })
    }
  }

  openUserModal(id) {
    if (this.userId != id) {
      this.modalCtrl.create(UserModalPage, {userId: id}).present();
      this.viewController.dismiss(null);
    }
  }

  dismiss() {
    this.viewController.dismiss(null);
  }

}
