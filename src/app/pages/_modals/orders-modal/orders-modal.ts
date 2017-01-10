import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController, ToastController} from 'ionic-angular';
import {HomeService} from "../../../services/home.service";
import {ShopService} from "../../../services/shop.service";

@Component({
  selector: 'orders-modal',
  templateUrl: 'orders-modal.html'
})
export class OrdersModal {

  userId: string;
  page: number = 0;
  size: number = 20;
  lastPage: boolean = false;
  ordersList = [];

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public viewController: ViewController, public homeService: HomeService, public shopService: ShopService) {
    this.userId = this.homeService.currentUserId;
    this.shopService.getUserOrders(this.userId, this.page, this.size).subscribe(
      orders => this.ordersList = orders.content
    )
  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewController.dismiss(null);
  }

}
