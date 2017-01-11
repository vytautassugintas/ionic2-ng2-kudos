import {Component} from '@angular/core';
import {
  NavController, ViewController, ToastController, NavParams, ActionSheetController,
  ModalController
} from 'ionic-angular';
import {KudosForm} from "../../../forms/kudos.form";
import {KudosService} from "../../../services/kudos.service";
import {HomeService} from "../../../services/home.service";
import {Error} from "../../../forms/error";
import {EndorsementsModalPage} from "../endorsements-modal/endorsements-modal";


@Component({
  selector: 'page-kudos-modal',
  templateUrl: 'kudos-modal.html'
})
export class KudosModalPage {

  showMessageCharactersCounter = false;
  emailInputFocused = false;
  showPredicates = false;
  predicatedEmails = [];
  kudosForm: KudosForm = new KudosForm("", null, "", "");
  user: any = {};
  error: Error;

  constructor(public navCtrl: NavController, params: NavParams, public viewController: ViewController, public kudosService: KudosService, public toastCtrl: ToastController, public homeService: HomeService, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController) {
    this.user = params.get('user');
    if (params.get('email')){
      this.kudosForm.receiverEmail = params.get('email');
    }
  }

  ionViewDidLoad() {

  }

  sendKudos() {
    this.error = this.kudosForm.validate(this.user.weeklyKudos);

    if (this.error.field == "") {
      this.kudosService.giveKudos(this.kudosForm.receiverEmail, this.kudosForm.amount, this.kudosForm.message, this.kudosForm.endorsement).subscribe(
        result => {
          this.presentToast("Kudos sent to " + result.receiverFullName);
          this.viewController.dismiss(this.kudosForm.amount);
          this.kudosForm = new KudosForm("", null, "", "");
        }
      );
    }
  }

  loadPredicates(name) {
    this.homeService.getEmailPredicates(name).subscribe(
      emails => {
        this.predicatedEmails = emails;
      }
    )
  }

  selectPredicate(email) {
    this.kudosForm.receiverEmail = email;
    this.showPredicates = false;
  }

  presentToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

  presentEndorsementsModal(){
    let modal = this.modalCtrl.create(EndorsementsModalPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.kudosForm.endorsement = data;
      }
    });
    modal.present();
  }

  onEmailInputChange(email) {
    this.showPredicates = email.length > 2;
    if (this.showPredicates) {
      this.loadPredicates(email);
    }
  }

  onEmailFocus() {
    this.emailInputFocused = true;
  }

  onEmailBlur() {
    setTimeout(() => {
      this.emailInputFocused = false
    }, 30)

  }

  dismiss() {
    this.viewController.dismiss(null);
  }

}
