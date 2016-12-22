import {Component} from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';
import {UserModalPage} from "../_modals/user-modal/user-modal";
import {KudosService} from "../../services/kudos.service";
import {KudosResponse} from "../../model/response/kudos.model";
import {EndorsedTransactionsModalPage} from "../_modals/endorsed-transactions-modal/endorsed-transactions-modal";

@Component({
  selector: 'page-about',
  templateUrl: 'history.html',
  providers: [KudosService]
})
export class HistoryPage {

  segment: string = 'transactions';
  kudosHistoryList: Array<KudosResponse>;
  endorsementsList = [];
  page: number = 0;
  lastPage: boolean = false;

  constructor(public navCtrl: NavController, private kudosService: KudosService, public modalCtrl: ModalController) {
    this.getKudosHistory(this.page, 10);
    this.getEndorsements();
  }

  getKudosHistory(page: number, size: number) {
    this.kudosService.getHistory(page, size).subscribe(
      history => {
        this.kudosHistoryList = history.content;
        this.page++;
      }
    );
  }

  getEndorsements() {
    this.kudosService.getEndorsements().subscribe(
      endorsements => {
          for (let key in endorsements){
            this.endorsementsList.push({
              title: key,
              value: endorsements[key]
            });
          }
          this.endorsementsList.sort((n1, n2) => n2.value - n1.value);
      }
    )
  }

  doInfinite(infiniteScroll) {
    if (this.lastPage) {
      infiniteScroll.enable(false);
    } else {
      this.kudosService.getHistory(this.page, 10).subscribe(
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
    this.modalCtrl.create(UserModalPage, {userId: id}).present();
  }

  openEndorsedTransactionsModal(endorsement) {
    this.navCtrl.push(EndorsedTransactionsModalPage, {endorsement: endorsement});
  }

}
