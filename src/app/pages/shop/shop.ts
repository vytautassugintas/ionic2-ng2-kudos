import {Component} from '@angular/core';
import {NavController, ModalController, ToastController} from 'ionic-angular';
import {ShopService} from "../../services/shop.service";
import {OrdersModal} from "../_modals/orders-modal/orders-modal";

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage {

  availablePoints: any;
  shopItems: Array<any> = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController, public shopService: ShopService) {
    this.shopService.getAvailablePoints().subscribe(
      points => this.availablePoints = points.points
    );
    this.shopService.getUserHistory(0, 20).subscribe(
      items => this.shopItems = items.content
    );
  }

  ionViewDidLoad() {

  }

  buyItem(id: string, index) {
    if (this.shopItems[index].price > this.availablePoints) {
      this.presentToast("You don't have enough points", true)
    } else {
      this.shopService.buyItem(id).subscribe(
        success => {
          this.presentToast("Successfully ordered item", false);
          this.availablePoints = this.availablePoints - this.shopItems[index].price;
        }
      )
    }
  }

  openOrdersModal() {
    let modal = this.modalCtrl.create(OrdersModal);
    modal.present();
  }

  presentToast(message: string, error: boolean) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass: error ? "error-toast" : ""
    }).present();
  }

}
