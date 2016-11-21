import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {KudosService} from "../../app/services/kudos.service";
import {KudosResponse} from "../../app/model/response/kudos.model";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [KudosService]
})
export class AboutPage {

  kudosHistoryList: Array<KudosResponse>;

  constructor(public navCtrl: NavController, private kudosService: KudosService) {
    this.getKudosHistory(0, 10);
  }

  getKudosHistory(page: number, size: number) {
    this.kudosService.getHistory(page, size).subscribe(
      history => this.kudosHistoryList = history.content
    );
  }



}
