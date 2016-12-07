import {Component} from '@angular/core';
import {NavController, ViewController, ToastController, NavParams, ActionSheetController} from 'ionic-angular';
import {KudosForm} from "../../../app/forms/kudos.form";
import {KudosService} from "../../../app/services/kudos.service";
import {HomeService} from "../../../app/services/home.service";
import {Error} from "../../../app/forms/error";

@Component({
  selector: 'page-kudos-modal',
  templateUrl: 'kudos-modal.html'
})
export class KudosModalPage {

  showMessageCharactersCounter = false;
  emailInputFocused = false;
  showPredicates = false;
  predicatedEmails = [];
  kudosForm: KudosForm = new KudosForm("", null, "");
  user: any = {};
  error: Error;

  selectedEndorsement: string;

  constructor(public navCtrl: NavController, params: NavParams, public viewController: ViewController, public kudosService: KudosService, public toastCtrl: ToastController, public homeService: HomeService, public actionSheetCtrl: ActionSheetController) {
    this.user = params.get('user');
  }

  ionViewDidLoad() {

  }

  sendKudos() {
    this.error = this.kudosForm.validate(this.user.weeklyKudos);

    if (this.error.field == "") {
      this.kudosService.giveKudos(this.kudosForm.receiverEmail, this.kudosForm.amount, this.kudosForm.message).subscribe(
        result => {
          this.presentToast("Kudos sent to " + result.receiverFullName);
          this.viewController.dismiss(this.kudosForm.amount);
          this.kudosForm = new KudosForm("", null, "");
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

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        this.createActionSheetButton("Nice"),
        this.createActionSheetButton("Carry"),
        this.createActionSheetButton("Open"),
        this.createActionSheetButton("Cancel")
      ]
    });

    actionSheet.present();
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

  onMessageFocus() {
    this.showMessageCharactersCounter = true;
  }

  onMessageBlur() {
    this.showMessageCharactersCounter = false;
  }

  dismiss() {
    this.viewController.dismiss(null);
  }

  createActionSheetButton(title) {
    if (title == "Cancel") {
      return {
        text: title,
        handler: () => {}
      }
    } else {
      return {
        text: title,
        handler: () => {
          this.selectedEndorsement = title;
        }
      }
    }
  }

}
