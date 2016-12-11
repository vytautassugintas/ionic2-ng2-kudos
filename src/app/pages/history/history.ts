import {Component} from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';
import {UserModalPage} from "../_modals/user-modal/user-modal";
import {KudosService} from "../../services/kudos.service";
import {KudosResponse} from "../../model/response/kudos.model";

@Component({
  selector: 'page-about',
  templateUrl: 'history.html',
  providers: [KudosService]
})
export class HistoryPage {

  kudosHistoryList: Array<KudosResponse>;

  constructor(public navCtrl: NavController, private kudosService: KudosService, public modalCtrl: ModalController) {
    this.getKudosHistory(0, 10);
  }

  getKudosHistory(page: number, size: number) {
    this.kudosService.getHistory(page, size).subscribe(
      history => this.kudosHistoryList = history.content
    );
  }

  openUserModal(id) {
    this.modalCtrl.create(UserModalPage, {userId: id}).present();
  }

}
