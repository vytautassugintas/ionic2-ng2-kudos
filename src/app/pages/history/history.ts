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

  constructor(public navCtrl: NavController, private kudosService: KudosService, public modalCtrl: ModalController) {
    this.getKudosHistory(0, 10);
    this.getEndorsements();
  }

  getKudosHistory(page: number, size: number) {
    this.kudosService.getHistory(page, size).subscribe(
      history => this.kudosHistoryList = history.content
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
            console.log(key);
          }
      }
    )
  }

  openUserModal(id) {
    this.modalCtrl.create(UserModalPage, {userId: id}).present();
  }

  openEndorsedTransactionsModal(endorsement) {
    this.navCtrl.push(EndorsedTransactionsModalPage, {endorsement: endorsement});
  }

}
