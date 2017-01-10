import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {ShopService} from "../../services/shop.service";
import {OrdersModal} from "../_modals/orders-modal/orders-modal";

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage {

  availablePoints: any;
  shopItems: Array<any> = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public shopService: ShopService) {
    this.shopService.getAvailablePoints().subscribe(
      points => this.availablePoints = points.points
    );
    this.shopService.getUserHistory(0, 20).subscribe(
      items => this.shopItems = items.content
    );
  }

  ionViewDidLoad() {

  }

  buyItem(id: string){
    this.shopService.buyItem(id).subscribe(
      ok => console.log("SUCCES")
    )
  }

  openOrdersModal(){
    let modal = this.modalCtrl.create(OrdersModal);
    modal.present();
  }

}
