import {Component} from '@angular/core';
import {NavController, NavParams, ModalController, ViewController} from 'ionic-angular';
import {HomeService} from "../../../services/home.service";
import {KudosService} from "../../../services/kudos.service";
import {UserModalPage} from "../user-modal/user-modal";

@Component({
  selector: 'page-user-endorsed-transactions-modal',
  templateUrl: 'user-endorsed-transactions-modal.html'
})
export class UserEndorsedTransactionsModalPage {

  userId: string = null;
  endorsement: string;
  endorsedTransactionsList = [];

  page: number = 0;
  lastPage: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public viewController: ViewController, public homeService: HomeService, public kudosService: KudosService) {
    this.userId = params.get("userId");
    this.endorsement = params.get("endorsement");
  }

  ionViewDidLoad() {
    this.getUserTransactionsByEndorsement();
  }

  getUserTransactionsByEndorsement() {
    return this.kudosService.getUserTransactionsByEndorsement(this.userId, this.endorsement, this.page, 10).subscribe(
      result => {
        this.page++;
        for (var item of result.content) {
          this.endorsedTransactionsList.push(item);
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
      this.kudosService.getUserTransactionsByEndorsement(this.endorsement, this.userId, this.page, 10).subscribe(
        result => {
          this.page++;
          for (var item of result.content) {
            this.endorsedTransactionsList.push(item);
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
    this.modalCtrl.create(UserModalPage, {userId: id}).present();
  }

}
