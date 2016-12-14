import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {HomeService} from "../../../services/home.service";
import {KudosService} from "../../../services/kudos.service";
import {EndorsedTransactionsModalPage} from "../endorsed-transactions-modal/endorsed-transactions-modal";
import {UserEndorsedTransactionsModalPage} from "../user-endorsed-transactions-modal/user-endorsed-transactions-modal";


@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html'
})
export class UserModalPage {

  segment: string = "transactions";
  userId: string;
  userProfile: any = {};
  kudosHistoryList = [];
  endorsementsList = [];
  page: number = 0;
  lastPage: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public viewController: ViewController, public homeService: HomeService, public kudosService: KudosService) {
    this.userId = params.get("userId");
  }

  ionViewDidLoad() {
    this.loadUserProfile(this.userId);
    this.getKudosHistory(this.page, 10);
    this.getEndorsements();
  }

  loadUserProfile(id) {
    this.homeService.userProfile(id).subscribe(
      profile => this.userProfile = profile,
      error => console.log(error)
    )
  }

  getUserFullName() {
    return this.userProfile.firstName + ' ' + this.userProfile.lastName;
  }

  getEndorsements() {
    this.kudosService.getUserEndorsements(this.userId).subscribe(
      endorsements => {
        for (let key in endorsements){
          this.endorsementsList.push({
            title: key,
            value: endorsements[key]
          });
        }
        this.endorsementsList.sort((n1, n2) => {
          return n2.value - n1.value;
        })
      }
    )
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

  openEndorsedTransactionsModal(endorsement) {
    this.navCtrl.push(UserEndorsedTransactionsModalPage, {userId: this.userId, endorsement: endorsement});
  }

  dismiss() {
    this.viewController.dismiss(null);
  }

}
