import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams} from 'ionic-angular';
import {KudosService} from "../../../services/kudos.service";
import {HomeService} from "../../../services/home.service";
import {UserModalPage} from "../user-modal/user-modal";

@Component({
  selector: 'page-endorsed-transactions-modal',
  templateUrl: 'endorsed-transactions-modal.html'
})
export class EndorsedTransactionsModalPage {

  endorsement: string;
  endorsedTransactionsList = [];

  page: number = 0;
  lastPage: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public viewController: ViewController, public homeService: HomeService, public kudosService: KudosService) {
    this.endorsement = params.get("endorsement");
    console.log(this.endorsement);
  }

  ionViewDidLoad() {
    this.getUserTransactionsByEndorsement(this.page, 10);
  }

  getUserTransactionsByEndorsement(page, pageSize) {
    this.kudosService.getUserTransactionsByEndorsement(this.endorsement, page, pageSize).subscribe(
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
      this.kudosService.getUserTransactionsByEndorsement(this.endorsement, this.page, 10).subscribe(
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
