import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams} from 'ionic-angular';
import {KudosService} from "../../../services/kudos.service";
import {HomeService} from "../../../services/home.service";
import {UserModalPage} from "../user-modal/user-modal";

@Component({
  selector: 'search-user-modal',
  templateUrl: 'search-user-modal.html'
})
export class SearchUserModal {

  searchEmail: string = '';
  showPredicates: boolean = false;
  predicatedEmails = [];

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public viewController: ViewController, public homeService: HomeService, public kudosService: KudosService) {

  }

  ionViewDidLoad() {

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

  onClear(event) {
    this.searchEmail = '';
    this.showPredicates = false;
    this.predicatedEmails = [];
  }

  openUserModal(id) {
    this.modalCtrl.create(UserModalPage, {userId: id}).present();
  }

  dismiss() {
    this.viewController.dismiss(null);
  }

}
