import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {ENDORSEMENT} from "../../../services/endorsements.constant";

@Component({
  selector: 'page-endorsements-modal',
  templateUrl: 'endorsements-modal.html'
})
export class EndorsementsModalPage {

  endorsements = [];

  constructor(public navCtrl: NavController, public viewController: ViewController) {
  }

  dismiss() {
    this.viewController.dismiss(null);
  }

  ionViewDidLoad() {
    this.initializeItems();
  }

  selectEndorsement(endorsement) {
    this.viewController.dismiss(endorsement);
  }

  searchItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;

    if (val && val.trim() != '') {
      let arrayToCheck: Array<string> = [];
      for (let i in this.endorsements){
        for(let item of this.endorsements[i].endorsements){
          arrayToCheck.push(item.endorsement);
        }
      }

      this.endorsements = arrayToCheck.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  initializeItems() {
    this.endorsements = ENDORSEMENT.LIST;
  }

}
